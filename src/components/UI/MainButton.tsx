interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  showIcon?: boolean;
  variant?: "primary" | "secondary";
}

export const MainButton: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center gap-1 rounded transition-all duration-300 w-40 h-10 shadow text-xs border-2 border-white";

  const variants = {
    primary: "bg-indigo-900 dark:bg-teal-700 text-slate-200",
    secondary: "bg-teal-600 dark:bg-slate-900 border-2", //Color teal
    
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
