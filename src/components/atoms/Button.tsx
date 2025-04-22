"use client";

/**
 * Primary button component with customizable properties
 * Follows design requirements with 42px height, horizontal padding of 24px, and border-radius of 6px
 */
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}) => {
  const baseClasses =
    "h-[42px] px-6 rounded-md font-medium transition-all duration-300 ease-in-out";

  const variantClasses = {
    primary:
      "bg-[#3B82F6] text-white hover:bg-[#2563EB] focus:ring-2 focus:ring-blue-300",
    secondary:
      "bg-[#10B981] text-white hover:bg-[#059669] focus:ring-2 focus:ring-green-300",
    outline:
      "bg-transparent border border-[#3B82F6] text-[#3B82F6] hover:bg-[#EFF6FF]",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
