import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({
  loading = false,
  rows = [],
  columns = [{ label: "Add Columns" }],
}) => {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <TableHeader columns={columns} />
      {loading ? (
        <p className="text-slate-600 pt-6 text-center font-medium text-lg">
          Loading Data....
        </p>
      ) : (
        <TableBody columns={columns} rows={rows} loading={loading} />
      )}
    </div>
  );
};

export default Table;
