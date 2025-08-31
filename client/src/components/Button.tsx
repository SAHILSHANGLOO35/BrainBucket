import { ReactElement } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const variantClasses = {
  primary:
    "bg-purple-900 text-white hover:bg-purple-600 transition-all duration-200",
  secondary:
    "bg-purple-300 text-purple-950 hover:bg-gray-500 hover:text-white transition-all duration-300",
};

const defaultStyles = "px-4 py-2 rounded-md font-semibold flex items-center";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
  isDisabled,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant ?? "primary"]} ${defaultStyles} ${
        fullWidth
          ? "w-full justify-center items-center tracking-wider font-semibold"
          : ""
      } ${loading || isDisabled ? "opacity-50 cursor-not-allowed" : ""} ${
        className ?? ""
      }`}
      disabled={loading || isDisabled}
    >
      {/* icon wrapper inherits color from button */}
      {startIcon && (
        <span className="pr-2 flex items-center text-inherit">{startIcon}</span>
      )}
      {text}
    </button>
  );
}
