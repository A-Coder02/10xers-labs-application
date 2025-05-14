import { useField } from "formik";
import React from "react";
import Label from "./Label";

const TextField = ({ label, name, placeholder, type = "text" }) => {
  // Using useField to connect the input with Formik
  const [field, meta] = useField(name);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Label name={name}>{label}</Label>
        <input
          {...field} // Spread the field props (value, onChange, onBlur)
          placeholder={placeholder}
          type={type}
          className={`border px-3 py-2 w-full ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {meta.touched && meta.error && <Label error>{meta.error}</Label>}
    </div>
  );
};

export default TextField;
