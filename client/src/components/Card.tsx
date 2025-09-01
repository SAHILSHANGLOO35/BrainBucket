import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EyeIcon } from "../icons/EyeIcon";
import XIcon from "@mui/icons-material/X";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { BACKEND_URL } from "../config";
import { DocumentIcon } from "../icons/DocumentIcon";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter" | "pdf";
  contentId: string;
  pdfPath: string;
  onDelete?: () => void;
}

export function Card({
  title,
  link,
  type,
  contentId,
  onDelete,
  pdfPath,
}: CardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
        headers: {
          Authorization: token,
        },
      });
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const pdfUrl = `${BACKEND_URL}${pdfPath}`;
  const location = useLocation();

  return (
    <div>
      <div className="max-w-72 border border-neutral-700/20 rounded-md shadow-md bg-neutral-100 text-neutral-600 font-semibold font-manrope p-4 min-h-48 min-w-72">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-neutral-900 pr-2">
              {type === "youtube" && <YoutubeIcon />}
              {type === "twitter" && <XIcon />}
              {type === "pdf" && <DocumentIcon />}
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="text-gray-800 pr-2 cursor-pointer">
              {type === "youtube" && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <EyeIcon />
                </a>
              )}
              {type === "twitter" && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <EyeIcon />
                </a>
              )}
              {type === "pdf" && (
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <EyeIcon />
                </a>
              )}
            </div>

            {location.pathname === `/dashboard` && (
              <div
                className="text-gray-800 cursor-pointer"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </div>
            )}
          </div>
        </div>

        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full border-0 rounded-lg"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <div>
              <blockquote className="twitter-tweet">
                <a href={link.replace("x", "twitter")}></a>
              </blockquote>
            </div>
          )}

          {type === "pdf" && (
            <>
              {isMobile ? (
                <div className="flex flex-col items-center justify-center space-y-4 p-4">
                  <DocumentIcon />
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
                  >
                    Open PDF
                  </a>
                </div>
              ) : (
                <iframe
                  className="w-full h-96 border-0 rounded-xl"
                  src={pdfUrl}
                  title="PDF Viewer"
                ></iframe>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
