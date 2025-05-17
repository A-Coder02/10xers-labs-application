import { useEffect, useState } from "react";
import ProductsService from "../services/Products.service";
import { toast } from "react-toastify";

const useProducts = () => {
  // States & Binding
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    totalItems: 0,
    totalPages: 1,
  });

  useEffect(() => {
    setLoading(true);
    ProductsService.getList()
      .then((response) => {
        setRows(response.data);
        setPagination(response.pagination);
      })
      .catch((err) => {
        console.log("error: ", err);
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    list: rows,
    loading,
  };
};

export default useProducts;
