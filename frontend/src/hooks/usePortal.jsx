import React, { useEffect, useMemo, useState } from "react";
import Button from "../components/form-ui/Button";
import { toast } from "react-toastify";
import ProductsService from "../services/Products.service";

const usePortal = () => {
  // States & Bindings
  const [show, setShow] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const INITIAL_VALUES = useMemo(
    () => ({ name: "", price: 0, description: "", image: "" }),
    []
  );

  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  const columns = [
    {
      field: "id",
      label: "ID",
      renderCell: (data) => `#${data.id}`,
    },
    {
      field: "image",
      label: "Image",
      minWidth: "300px",
      renderCell: (data) => <img src={data.image} alt="thumbnail" />,
    },
    {
      field: "name",
      label: "Name",
      minWidth: "150px",
    },
    {
      field: "description",
      label: "Description",
      minWidth: "300px",
    },
    {
      field: "action",
      label: "Action",
      flex: 1,
      renderCell: (data) => (
        <div className="flex gap-4">
          <Button onClick={() => onClickEditButton(data)}>Update</Button>
          <Button variant="outlined" onClick={() => onClickRemoveButton(data)}>
            Remove
          </Button>
        </div>
      ),
    },
  ];

  const _rows = [
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "Product A",
      description: "High-quality product A",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Product B",
      description: "Durable and reliable product B",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/50",
      name: "Product C",
      description: "Affordable and efficient product C",
    },
  ];

  // Table states

  const [rows, setRows] = useState([]);
  const [loadingRows, setLoadingRows] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 4,
    page: 1,
    totalItems: 0,
    totalPages: 1,
  });
  // Fetch products based on the current page
  const fetchProducts = async (page, isFirstTime) => {
    setLoadingRows(true);
    try {
      const response = await ProductsService.getList({
        page,
        limit: pagination.limit,
      });

      // Append new products to the existing list
      setRows(response.data);

      setPagination((prev) => ({
        ...prev,
        page: page,
        totalItems: response.pagination.totalItems,
        totalPages: response.pagination.totalPages,
      }));

      // Check if more products are available
      // setHasMore(page < response.pagination.totalPages);
    } catch (err) {
      console.error("error: ", err);
      toast.error(err.message);
    } finally {
      setLoadingRows(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts(1);
  }, []);

  const onPageChange = (page) => {
    fetchProducts(page);
  };

  // Functions & Handlers
  const openModal = () => {
    setShow(true);
  };

  const addProduct = (values) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShow(false);
    }, 5000);
  };

  const removeProduct = (values) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowRemoveModal(false);
    }, 5000);
  };

  const onClickEditButton = (values) => {
    setInitialValues(values);
    setShow(true);
  };
  const onClickRemoveButton = (values) => {
    setInitialValues(values);
    setShowRemoveModal(true);
  };
  return {
    rows,
    columns,
    loadingRows,
    pagination,
    setPagination,
    onPageChange,
    openModal,
    initialValues,
    showRemoveModal,
    setShowProductModal: (bool) => {
      setShow(bool);
      setInitialValues(INITIAL_VALUES);
    },
    setShowRemoveModal: (bool) => {
      setShowRemoveModal(bool);
      setInitialValues(INITIAL_VALUES);
    },
    show,
    addProduct,
    loading,
    removeProduct,
  };
};

export default usePortal;
