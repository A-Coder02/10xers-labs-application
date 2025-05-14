import React from "react";

const Label = ({ name, children, error = false }) => {
  const _className = error ? "text-red-500" : "text-slate-800";
  return (
    <label htmlFor={name} className={`${_className} text-sm`}>
      {children}
    </label>
  );
};

export default Label;
