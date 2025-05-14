import React from "react";

const Button = ({
  type = "button",
  variant = "contained", // New prop for variant
  isLoading = false,
  disabled = false,
  children,
  onClick,
}) => {
  // Styling based on variant
  const baseClasses = "py-2 px-4 mt-2 transition cursor-pointer h-fit";
  const containedClasses = "bg-blue-500 text-white hover:bg-blue-600";
  const outlinedClasses =
    "border border-blue-500 text-blue-500 hover:bg-blue-50";

  const disabledClasses = "opacity-50 cursor-not-allowed";

  // Choose styles based on variant and disabled state
  const classes = `${baseClasses} ${
    variant === "contained" ? containedClasses : outlinedClasses
  } ${disabled || isLoading ? disabledClasses : ""}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={classes}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
