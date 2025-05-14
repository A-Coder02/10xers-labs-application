import React from "react";

const Button = ({
  type = "button",
  isLoading = false,
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`bg-blue-500 text-white rounded-lg py-2 mt-2 hover:bg-blue-600 transition cursor-pointer
        ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
