import { useField } from "formik";
import React from "react";
import Label from "./Label";

const TextareaField = ({ label, name, placeholder }) => {
  // Using useField to connect the textarea with Formik
  const [field, meta] = useField(name);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Label name={name}>{label}</Label>
        <textarea
          {...field} // Spread the field props (value, onChange, onBlur)
          placeholder={placeholder}
          className={`border px-3 py-2 w-full resize-none h-24 ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {meta.touched && meta.error && <Label error>{meta.error}</Label>}
    </div>
  );
};

export default TextareaField;
