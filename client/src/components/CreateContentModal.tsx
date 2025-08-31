import React, { useEffect, useRef, useState } from "react";
import { X, FileText, Upload } from "lucide-react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  PDF = "pdf",
}

export function CreateContentModal({ open, onClose }) {
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasValidUrl, setHasValidUrl] = useState(false);

  const isValidYoutubeUrl = (url: string): boolean => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/;
    return youtubeRegex.test(url);
  };

  const isValidTwitterUrl = (url: string): boolean => {
    const twitterRegex =
      /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+$/;
    return twitterRegex.test(url);
  };

  async function addContent() {
    const title = titleRef.current?.value?.trim();
    const link = linkRef.current?.value?.trim();
    const token = localStorage.getItem("token");

    if (!title) {
      toast.error("Title is required!");
      return;
    }

    try {
      if (type === ContentType.PDF && file) {
        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("title", title || "My PDF");
        formData.append("type", ContentType.PDF);

        await axios.post(`${BACKEND_URL}/api/v1/upload-pdf`, formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("PDF uploaded successfully");
      } else if (type !== ContentType.PDF) {
        if (!link) {
          toast.error("Link is required for YouTube or Twitter content!");
          return;
        }

        if (type === ContentType.Youtube && !isValidYoutubeUrl(link)) {
          toast.error("Please enter a valid YouTube URL!");
          return;
        }

        if (type === ContentType.Twitter && !isValidTwitterUrl(link)) {
          toast.error("Please enter a valid Twitter/X URL!");
          return;
        }

        await axios.post(
          `${BACKEND_URL}/api/v1/content`,
          {
            title,
            link,
            type,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        toast.success("Content added successfully");
      }

      // Clear form and close modal
      setTitle("");
      setLink("");
      setFile(null);
      setHasValidUrl(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onClose();
    } catch (error) {
      console.error("Error adding content:", error);
      toast.error("Failed to add content. Please try again.");
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.[0]) {
      setFile(files[0]);
      setType(ContentType.PDF);
      setHasValidUrl(false);
      setLink("");
    }
  };

  useEffect(() => {
    if (isValidYoutubeUrl(link)) {
      setType(ContentType.Youtube);
      setHasValidUrl(true);
    } else if (isValidTwitterUrl(link)) {
      setType(ContentType.Twitter);
      setHasValidUrl(true);
    } else {
      setHasValidUrl(false);
    }
  }, [link]);

  const handleTypeChange = (newType: ContentType) => {
    if (!hasValidUrl) {
      setType(newType);
      if (newType === ContentType.PDF) {
        setLink("");
        setHasValidUrl(false);
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 font-manrope">
      <Toaster position="top-right" />
      <div
        className="fixed inset-0 bg-black/80 bg-opacity-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none px-2 sm:px-0">
        <div className="bg-white rounded-lg w-96 p-6 pointer-events-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add Content</h2>
            <button
              onClick={onClose}
              className="hover:text-gray-700 hover:rotate-90 transition-all duration-300 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                ref={titleRef}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter title"
              />
            </div>

            {type !== ContentType.PDF && (
              <div>
                <label className="block text-sm font-medium mb-1">Link</label>
                <input
                  type="text"
                  value={link}
                  ref={linkRef}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder={`Enter ${
                    type === ContentType.Youtube ? "YouTube" : "Twitter/X"
                  } link (URL only)`}
                />
              </div>
            )}

            {type === ContentType.PDF && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload PDF
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-gray-400"
                >
                  {file ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileText size={20} />
                      <span>{file.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload size={24} />
                      <span>Click to upload PDF</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <div className="flex gap-2">
                {["Youtube", "Twitter", "PDF"].map((btnType) => {
                  const contentType =
                    ContentType[btnType as keyof typeof ContentType];
                  const isDisabled = hasValidUrl && type !== contentType;

                  return (
                    <button
                      key={btnType}
                      onClick={() => handleTypeChange(contentType)}
                      disabled={isDisabled}
                      className={`flex-1 px-4 py-2 rounded-md ${
                        type === contentType
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {btnType}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={addContent}
              className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-purple-700 cursor-pointer transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
