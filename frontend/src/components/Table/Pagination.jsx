import React from "react";
import Button from "../form-ui/Button";

const Pagination = ({ loading, pagination, onPageChange }) => {
  const { page, totalPages } = pagination;
  if (pagination)
    return (
      <div className="flex gap-4 justify-end items-center">
        <p>
          {page} of {totalPages}
        </p>
        <Button
          isLoading={loading}
          variant="outlined"
          size="sm"
          disabled={page === 1}
          onClick={() => {
            onPageChange(page - 1);
          }}
        >
          Previous
        </Button>
        <Button
          isLoading={loading}
          variant="contained"
          size="sm"
          disabled={page === totalPages}
          onClick={() => {
            onPageChange(page + 1);

            // setPagination((prev) => ({ ...prev, page: page + 1 }));
          }}
        >
          Next
        </Button>
      </div>
    );
};

export default Pagination;
