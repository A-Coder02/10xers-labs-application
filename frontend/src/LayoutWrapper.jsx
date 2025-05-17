import React, { useEffect } from "react";
import Header from "./components/layout-ui/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, setTokens, setUser } from "./store/auth.slice";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
const LayoutWrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const user = auth?.user?.[0] || auth?.user || {};

  useEffect(() => {
    // To store tokens in store
    // if its not exists redirect to login screen
    const initAuth = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const refreshToken = sessionStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        dispatch(setTokens({ accessToken, refreshToken }));
        const decoded = jwtDecode(accessToken);
        dispatch(setUser(decoded));
      } else {
        dispatch(clearAuth());
        navigate("/login");
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    // this allows only admin role based users only
    const checkUserIsAdminOrNot = () => {
      if (user && user?.role) {
        console.log({ userAccess: user.role });
        if (user.role !== "admin") {
          toast.warn(
            "Not Permissible to access portal via User Account, Please use Admin Account"
          );
          navigate("/login");
        }
      }
    };
    checkUserIsAdminOrNot();
  }, [auth]);

  return (
    <div className="flex flex-col flex-1 h-full">
      <Header />
      <main className="my-4 px-4 flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWrapper;
