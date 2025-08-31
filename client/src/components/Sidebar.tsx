import { DocumentIcon } from "../icons/DocumentIcon";
import XIcon from "@mui/icons-material/X";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SidebarItem";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export function Sidebar({ onFilterChange, selectedFilter }) {
  return (
    <div className="h-screen bg-neutral-100 w-60 border-r border-neutral-700/20 fixed left-0 top-0 font-manrope">
      <div
        className="flex text-2xl items-center pl-4 mt-2 mb-4 gap-3 font-semibold pt-2 cursor-pointer hover:text-purple-300"
        onClick={() => onFilterChange("all")}
      >
        <div className="text-black font-extrabold text-2xl flex items-center gap-2">
          <AutoFixHighIcon fontSize="large" />
          brainbucket
        </div>
      </div>

      <div className="pl-6 pt-4">
        <SideBarItem
          icon={<XIcon />}
          text="Twitter"
          onClick={() => onFilterChange("twitter")}
          isActive={selectedFilter === "twitter"}
        />
        <SideBarItem
          icon={<YoutubeIcon />}
          text="YouTube"
          onClick={() => onFilterChange("youtube")}
          isActive={selectedFilter === "youtube"}
        />
        <SideBarItem
          icon={<DocumentIcon />}
          text="Document"
          onClick={() => onFilterChange("pdf")}
          isActive={selectedFilter === "pdf"}
        />
      </div>
    </div>
  );
}
