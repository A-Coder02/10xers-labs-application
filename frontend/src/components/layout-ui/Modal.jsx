import React from "react";
import { createPortal } from "react-dom";
import Button from "../form-ui/Button";

const Modal = ({ show, setShow, title, children }) => {
  if (!show) return null;

  const modal = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] bg-opacity-50 z-50"
      onClick={() => setShow(false)}
    >
      <div className="bg-white px-4 py-3 shadow-md w-96 relative">
        <div className="flex flex-row justify-between items-center">
          {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
          <p
            className="underline text-blue-500 ml-auto cursor-pointer"
            onClick={() => setShow(false)}
          >
            Close
          </p>
        </div>

        {/* Modal Title */}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default Modal;
