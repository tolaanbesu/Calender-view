import React, { memo } from "react";
import { cn } from "../../utils/class.utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  "aria-label"?: string; 
}

// Wrapped in memo for performance
export const Button: React.FC<ButtonProps> = memo(({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const base =
    "font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";
  
  const variants: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50",
    secondary:
      "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus:ring-neutral-400/50",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50",
    outline:
      "border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 focus:ring-neutral-400/50",
  };
  const sizes: Record<string, string> = {
    sm: "px-2.5 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";