import React from "react";

const TableBody = ({ columns, rows, loading = false }) => {
  return (
    <div className="flex-1">
      {rows.map((row) => (
        <div className="p-4 bg-white border-b border-b-slate-400 !border-solid">
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
                {column.renderCell?.(row, column) || row[column.field]}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableBody;
