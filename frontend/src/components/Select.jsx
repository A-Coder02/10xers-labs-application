import { useField } from "formik";
import React from "react";

const Select = ({ label, name, options }) => {
  // Using useField to connect the select input with Formik
  const [field, meta] = useField(name);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-slate-800">
          {label}
        </label>
        <select
          {...field} // Spread the field props (value, onChange, onBlur)
          id={name}
          className={`border px-3 py-2 w-full ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-300"
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {meta.touched && meta.error && (
        <span className="text-sm text-red-500">{meta.error}</span>
      )}
    </div>
  );
};

export default Select;
