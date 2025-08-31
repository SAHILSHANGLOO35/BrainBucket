import { ReactElement } from "react";

export function SideBarItem({
  text,
  icon,
  onClick,
  isActive,
}: {
  text: string;
  icon: ReactElement;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        group flex items-center rounded cursor-pointer max-w-44 
        transition-all duration-300 mb-3 mt-1 font-manrope font-semibold
        ${
          isActive
            ? "bg-neutral-600/20 pl-4 text-white"
            : "hover:bg-sky-500/80 hover:pl-4 hover:text-white"
        }
      `}
    >
      <div
        className={`p-2 ${
          isActive
            ? "text-neutral-600"
            : "text-neutral-900 group-hover:text-white"
        }`}
      >
        {icon}
      </div>
      <div
        className={`p-2 text-shadow-2xs ${
          isActive
            ? "text-neutral-600"
            : "text-neutral-600 group-hover:text-white"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
