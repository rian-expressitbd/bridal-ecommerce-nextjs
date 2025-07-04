"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "flat" | "edge" | "outline" | "outline-flat" | "outline-edge" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "none";
  /**
   * Required for accessibility. Provides a tooltip and accessible name for the button.
   */
  title: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  variant = "default",
  size = "none",
  children,
  className,
  title,
  type = "button",
  ...props
}: ButtonProps) => {
  // Base styles for all buttons
  const baseStyles = "font-semibold transition-all duration-200 w-fit cursor-pointer";

  // Variant-specific styles
  const variantStyles = {
    default: "rounded bg-primary text-white",
    flat: "rounded-none bg-primary text-text",
    edge: "rounded-full border border-primary",
    outline: "border border-primary rounded",
    "outline-flat": "border border-primary rounded-none",
    "outline-edge": "border border-primary rounded-full",
    ghost: "shadow-none border-none rounded-none bg-transparent",
    link: "text-primary hover:underline p-0",
  };

  // Size-specific styles
  const sizeStyles = {
    none: "",
    xs: "p-1 text-xs",
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  return (
    <button
      type={type}
      className={twMerge(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      aria-label={title}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
};
