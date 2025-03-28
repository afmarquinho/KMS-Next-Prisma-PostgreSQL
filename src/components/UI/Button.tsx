import {
  CheckCheckIcon,
  SaveIcon,
  SearchIcon,
  SettingsIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  showIcon?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  showIcon = false,
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center gap-1 rounded font-medium transition-all duration-300 w-24 h-8";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
    warning: "bg-yellow-500 text-black hover:bg-yellow-600",
    info: "bg-cyan-500 dark:bg-cyan-600 text-white hover:bg-cyan-600 dark:hover:bg-cyan-500",
  };

  const icons = {
    primary: <SaveIcon className="w-5 h-5" />,
    secondary: <SettingsIcon className="w-5 h-5" />,
    danger: <XIcon className="w-5 h-5" />,
    success: <CheckCheckIcon className="w-5 h-5" />,
    warning: <TriangleAlertIcon className="w-5 h-5" />,
    info: <SearchIcon className="w-5 h-5" />,
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {showIcon && icons[variant]}
      {children}
    </button>
  );
};
