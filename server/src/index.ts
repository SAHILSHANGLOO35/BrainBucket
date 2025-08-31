import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { ContentModel, UserModel, LinkModel } from "./db";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";
import path from "path";
import multer from "multer";
import { z } from "zod";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://brainbucket.tech"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve uploaded files
app.use(
  "/uploads",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  },
  express.static(path.join(__dirname, "../uploads"))
);

// Multer configuration for handling PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory for uploaded PDFs
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      return cb(Error("Only PDFs are allowed"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit size to 5MB
  },
});

interface AuthenticatedRequest extends Request {
  userId?: string;
  body: {
    title: string;
    link: string;
    type: string;
  };
}

const signupSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(50, "Username cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

//@ts-ignore
app.post("/api/v1/signup", async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.errors,
      });
    }

    const { username, email, password } = result.data;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(403).json({
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// @ts-ignore
app.post("/api/v1/signin", async (req, res) => {
  try {
    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).send({
        message: "Validation failed",
        errors: result.error.errors,
      });
    }

    const { email, password } = result.data;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).send({
        message: "User not found",
      });
      return;
    }

    const matchPassword = await bcrypt.compare(
      password,
      user.password as string
    );

    if (matchPassword) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_USER_SECRET as string
      );

      res.status(200).send({
        token: token,
      });
    } else {
      res.status(403).send({
        message: "Incorrect credentials!",
      });
    }
  } catch (error) {
    res.status(404).send({
      message: "Internal server error",
    });
  }
});

app.post(
  "/api/v1/content",
  // @ts-ignore
  userMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      const title = req.body.title;
      const link = req.body.link;
      const type = req.body.type;

      await ContentModel.create({
        title,
        link,
        type,
        userId: req.userId,
        tags: [],
      });
      return res.status(200).send({
        message: "Content added successfully!",
      });
    } catch (error) {
      res.status(403).send({
        message: "Internal server error",
      });
    }
  }
);

app.post(
  "/api/v1/upload-pdf",
  // @ts-ignore
  userMiddleware,
  (req, res, next) => {
    upload.single("pdf")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({
            message: "File is too large. Maximum size is 10MB",
          });
        }
        return res.status(400).json({
          message: `Upload error: ${err.message}`,
        });
      } else if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      next();
    });
  },
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const { title = "My PDF", type = "pdf" } = req.body;
      const pdfPath = `/uploads/${req.file.filename}`;

      const newContent = await ContentModel.create({
        title,
        pdfPath,
        type,
        userId: (req as any).userId,
      });

      res.status(200).json({
        message: "PDF uploaded successfully",
        content: newContent,
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      res.status(500).json({
        message: "Internal server error during file processing",
      });
    }
  }
);

// @ts-ignore
app.get("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;

    const content = await ContentModel.find({ userId }).populate(
      "userId",
      "username"
    );

    res.send({
      content,
    });
  } catch (error) {
    res.status(403).send({
      messaage: "Internal server error",
    });
  }
});

// @ts-ignore
app.delete("/api/v1/content/:contentId", userMiddleware, async (req, res) => {
  try {
    const contentId = req.params.contentId;
    // @ts-ignore
    const userId = req.userId;

    const content = await ContentModel.findOne({
      _id: contentId,
    });

    if (!content) {
      return res.status(404).send({ message: "No content found to delete" });
    }

    const deleteContent = await ContentModel.deleteOne({
      _id: contentId,
      userId,
    });

    res.status(200).send({
      message: "Content deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(403).send({
      message: "Internal server error",
    });
  }
});

// @ts-ignore
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  try {
    const share = req.body.share;

    if (share) {
      const existingLink = await LinkModel.findOne({
        // @ts-ignore
        userId: req.userId,
      });

      if (existingLink) {
        return res.json({
          hash: existingLink.hash,
        });
      }

      const hash = random(10);

      await LinkModel.create({
        // @ts-ignore
        userId: req.userId,
        hash: hash,
      });
      return res.json({
        hash: hash,
      });
    } else {
      await LinkModel.deleteOne({
        // @ts-ignore
        userId: req.userId,
      });
      return res.json({
        message: "Removed link",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// @ts-ignore
app.get("/api/v1/brain/:shareLink", async (req, res) => {
  try {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
      hash: hash,
    });

    if (!link) {
      res.status(403).send({
        message: "Sorry incorrect input",
      });
      return;
    }
    // early return
    const content = await ContentModel.find({
      userId: link.userId,
    });

    const user = await UserModel.findOne({
      _id: link.userId,
    });

    res.status(200).send({
      username: user?.username,
      content: content,
    });
  } catch (error) {
    res.status(403).send({
      message: "Internal server error",
    });
  }
});

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    app.listen(process.env.PORT, () => {
      console.log("Server started on port", process.env.PORT);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

main();
