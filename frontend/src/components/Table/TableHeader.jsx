import React from "react";

const TableHeader = ({ columns = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 bg-white border border-slate-400 !border-solid">
        <div className="flex">
          {columns.map((column, index) => (
            <div
              key={columns.field}
              className="col-span-1"
              style={{
                minWidth: column.minWidth || "150px",
                maxWidth: column.maxWidth || "auto",
                flex: columns.flex || "0",
              }}
            >
              {column.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
