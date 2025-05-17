import axios from "axios";
import { loginUrl } from "../utils/urls";
import { toast } from "react-toastify";

const login = (body) => {
  return axios
    .post(loginUrl, body)
    .then((res) => res.data)
    .catch((error) => {
      toast.error(
        error.message || error.response.message || "Something went wrong"
      );
      return error.response;
    });
};

export default {
  login,
};
