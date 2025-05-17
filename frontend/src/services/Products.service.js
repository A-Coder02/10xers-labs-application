import axios from "axios";
import { productsUrl } from "../utils/urls";
import { toast } from "react-toastify";

const getList = async () => {
  try {
    const response = await axios.get(productsUrl);
    return response.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};

const ProductsService = {
  getList,
};

export default ProductsService;
