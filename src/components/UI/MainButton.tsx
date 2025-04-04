interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  showIcon?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
}

export const MainButton: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center gap-1 rounded transition-all duration-300 shadow text-xs border-2 border-white w-36 md:w-40 md:px-0 h-10";

  const variants = {
    primary: "bg-indigo-900 dark:bg-teal-700 text-slate-200",
    secondary: "bg-teal-600 dark:bg-slate-900 border-2 text-white dark:text-slate-200", //Color teal
    tertiary:
      "bg-white dark:bg-transparent text-slate-800 dark:text-slate-200",
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
