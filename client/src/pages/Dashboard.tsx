import { useEffect, useState, useRef } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { LogOut, Menu } from "lucide-react";
import { DownArrowIcon } from "../icons/DownArrowIcon";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [shareText, setShareText] = useState("Share Brain");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // @ts-ignore
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 35);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDelete = () => {
    refresh();
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter.toLowerCase());
    setIsSidebarOpen(false);
  };

  const filteredContents = contents.filter((content) => {
    if (selectedFilter === "all") return true;
    // @ts-ignore
    return content.type.toLowerCase() === selectedFilter;
  });

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // @ts-ignore
      // const shareUrl = `https://brainbucket.tech/share/${response.data.hash}`;
      const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
      await navigator.clipboard.writeText(shareUrl);
      setShareText("Copied");
      setTimeout(() => setShareText("Share Brain"), 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-[#0B0B0F] to-gray-950">
      {/* Mobile Sidebar */}
      <div
        className={`
                fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300
                lg:hidden
                ${
                  isSidebarOpen
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }
            `}
      >
        <div
          className={`
                    fixed inset-y-0 left-0 w-60 bg-gray-900 transform transition-transform duration-300
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
        >
          <Sidebar
            onFilterChange={handleFilterChange}
            selectedFilter={selectedFilter}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-60">
        <Sidebar
          onFilterChange={handleFilterChange}
          selectedFilter={selectedFilter}
        />
      </div>

      {/* Main Content */}
      <div className="lg:ml-60">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        {/* Top Bar */}
        <div
          className={`
                    fixed top-0 right-0 left-0 lg:left-60
                    flex items-center justify-between
                    p-4 transition-all duration-150
                    ${
                      isScrolled
                        ? "bg-gray-900 bg-opacity-50 backdrop-blur-md border-b-2 border-b-white/15"
                        : "bg-opacity-0 border-b-transparent"
                    }
                `}
        >
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text={window.innerWidth < 640 ? "" : "Add Content"}
              startIcon={<PlusIcon />}
            />

            <Button
              onClick={handleShare}
              variant="secondary"
              text={window.innerWidth < 640 ? "" : shareText}
              startIcon={<ShareIcon />}
              isDisabled={contents.length === 0}
            />

            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center justify-center cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <DownArrowIcon />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      className="w-full px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/signin";
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="md:pt-24 pt-20 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredContents.length > 0 ? (
            filteredContents.map(({ title, link, type, _id, pdfPath }) => (
              <Card
                key={_id}
                type={type}
                link={link}
                title={title}
                contentId={_id}
                onDelete={handleDelete}
                pdfPath={pdfPath}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-white">
              {selectedFilter === "all"
                ? "Add your important content here"
                : `No ${selectedFilter} content available`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
