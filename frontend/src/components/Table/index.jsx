import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";

/**
 * A Table component to display data in a structured format.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} [props.loading=false] - Indicates if data is being loaded.
 * @param {Array<Object>} [props.rows=[]] - The data to be displayed in table rows.
 * @param {Array<{label: string}>} [props.columns=[]] - The table columns to be displayed.
 * @returns {JSX.Element} The rendered table component with a header and body.
 */
const Table = ({
  loading = false,
  rows = [],
  columns = [{ label: "Add Columns" }],
  pagination = null,
  setPagination = () => {},
  onPageChange = () => {},
}) => {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <TableHeader columns={columns} />
      <div className="flex-1">
        {loading ? (
          <p className="text-slate-600 pt-6 text-center font-medium text-lg">
            Loading Data....
          </p>
        ) : (
          <TableBody columns={columns} rows={rows} loading={loading} />
        )}
      </div>

      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Table;
