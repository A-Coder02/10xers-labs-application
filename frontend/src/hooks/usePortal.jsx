import React, { useEffect, useMemo, useState } from "react";
import Button from "../components/form-ui/Button";
import { toast } from "react-toastify";
import ProductsService from "../services/Products.service";
import { useSelector } from "react-redux";

const usePortal = () => {
  // States & Bindings
  const [show, setShow] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = useSelector((state) => state.auth);
  const user = auth?.user?.[0] || auth?.user || {};

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
      renderCell: (data) => (
        <img
          src={data.img_url}
          className="h-48 aspect-square object-contain"
          alt="thumbnail"
        />
      ),
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
        user_id: user?.id,
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
    if (typeof user.id === "string") {
      fetchProducts(1);
      console.log("user_id exists", user.id);
    }
  }, [user]);

  const onPageChange = (page) => {
    fetchProducts(page);
  };

  // Functions & Handlers
  const openModal = () => {
    setShow(true);
  };

  const addProduct = async (values) => {
    try {
      const data = values;
      data.img_url = data.image;
      delete data.image;
      setLoading(true);
      const response = await ProductsService.post(values);
      toast.success(response?.message);
      fetchProducts(pagination.page);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
      setShow(false);
    }
  };

  const editProduct = async (values) => {
    try {
      const data = values;
      data.img_url = data.image;
      delete data.image;
      setLoading(true);
      const response = await ProductsService.put(data, values.id);
      toast.success(response?.message);
      fetchProducts(pagination.page);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
      setShow(false);
    }
  };

  const removeProduct = async (values) => {
    try {
      setLoading(true);
      const response = await ProductsService.remove(values.id);
      toast.success(response.data.message);
      fetchProducts(pagination.page);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
      setShowRemoveModal(false);
    }
  };

  const onClickEditButton = (values) => {
    setInitialValues({ ...values, image: values.img_url });
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
    editProduct,
    loading,
    removeProduct,
  };
};

export default usePortal;
