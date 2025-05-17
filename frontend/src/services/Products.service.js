import axios from "axios";
import { productsUrl } from "../utils/urls";
import { toast } from "react-toastify";

const getList = async ({ page, limit }) => {
  try {
    const response = await axios.get(
      `${productsUrl}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};

const ProductsService = {
  getList,
};

export default ProductsService;
