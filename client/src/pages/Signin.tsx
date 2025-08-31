import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "motion/react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Eye, EyeOff, Loader } from "lucide-react";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export function Signin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignin = async function signin() {
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        password,
        email,
      });
      // @ts-ignore
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      setPassword("");
      setEmail("");
      setLoading(false);
      navigate(`/dashboard`);
    } catch (error: any) {
      setLoading(false);
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          toast.error(err.message);
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="font-manrope">
      <div className="z-50">
        <Toaster position="top-right" />
      </div>
      <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
        <div className="min-h-screen absolute inset-0 -z-10">
          <div className="absolute h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
          </div>
        </div>
        <div
          className="absolute top-8 left-8 flex cursor-pointer items-center justify-center gap-2 text-[14px] text-neutral-600 z-50"
          onClick={() => navigate("/")}
        >
          <FaArrowLeftLong />
          Back to Brain Bucket
        </div>

        <div className="relative flex h-screen items-center justify-center sm:w-full">
          <div className="absolute inset-0 flex items-center justify-center"></div>
          <motion.div
            className="relative flex flex-col items-center justify-center"
            initial={{
              y: -80,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              type: "tween",
              duration: 0.8,
              bounce: 0.2,
              mass: 0.8,
              stiffness: 80,
              damping: 20,
              opacity: {
                duration: 1.0,
                ease: "linear",
              },
            }}
            viewport={{ once: true }}
          >
            <div className="text-black font-extrabold text-2xl flex items-center gap-2 mb-6">
              <AutoFixHighIcon fontSize="large" />
              brainbucket
            </div>
            <div className="z-20 mb-2 text-3xl font-bold text-neutral-600">
              Sign In to{" "}
              <span className="font-pacifico tracking-widest">Continue</span>
            </div>

            <div className="z-20 mb-8 flex items-center justify-center text-[14px] text-neutral-600">
              Don't have an account?
              <div
                className="group ml-2 cursor-pointer transition-colors duration-300"
                onClick={() => navigate("/signup")}
              >
                <span className="text-blue-500 group-hover:bg-gradient-to-l group-hover:from-blue-500 group-hover:to-blue-300 group-hover:bg-clip-text group-hover:text-transparent">
                  Sign up.
                </span>
              </div>
            </div>

            <div className="relative z-20 mb-4 flex flex-col gap-y-2">
              <div className="text-[14px] text-neutral-600">Email</div>
              <div className="flex items-center justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[350px] rounded-md border border-neutral-700/40 bg-transparent px-4 py-3 text-neutral-800 placeholder-neutral-400 transition-all duration-300 outline-none hover:border-neutral-500 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-700/50 sm:w-[400px]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="z-20 mb-12">
              <div className="text-[14px] text-neutral-600">Password</div>
              <div className="flex items-center justify-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[350px] rounded-md border border-neutral-700/40 bg-transparent px-4 py-3 text-neutral-800 placeholder-neutral-400 transition-all duration-300 outline-none hover:border-neutral-500 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-700/50 sm:w-[400px]"
                  placeholder="Enter your password"
                />
                <button
                  className="absolute right-4 z-30 cursor-pointer text-xs text-neutral-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="z-20 mb-4">
              <div className="flex items-center justify-center">
                <button
                  className="w-[350px] cursor-pointer rounded-md bg-neutral-600 px-4 py-3 font-medium text-neutral-50 transition-colors duration-300 outline-none text-shadow-2xs hover:bg-gradient-to-r hover:from-neutral-600 hover:to-neutral-500 sm:w-[400px]"
                  onClick={handleSignin}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader className="h-6 w-6 animate-spin ease-linear" />
                    </div>
                  ) : (
                    <div>Sign In</div>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-8 flex items-center justify-center text-[14px] text-neutral-400">
              Happy to see you here again.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
