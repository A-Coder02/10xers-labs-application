import axios from "axios";
import { productsUrl } from "../utils/urls";
import { toast } from "react-toastify";

const getList = async ({ page, limit, email }) => {
  const params = {
    page,
    limit,
  };
  if (email) params.email = email;
  try {
    const response = await axios.get(`${productsUrl}`, {
      params,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};

const post = async (body) => {
  try {
    const response = await axios.post(productsUrl, body);
    return response.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};

const put = async (body, id) => {
  try {
    const response = await axios.put(`${productsUrl}/${id}`, body);
    return response.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};

const remove = async (id) => {
  try {
    const response = await axios.delete(`${productsUrl}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};

const ProductsService = {
  getList,
  post,
  put,
  remove,
};

export default ProductsService;
