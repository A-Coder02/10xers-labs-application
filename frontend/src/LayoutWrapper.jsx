import React, { useEffect } from "react";
import Header from "./components/layout-ui/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuth, setTokens, setUser } from "./store/auth.slice";
import { jwtDecode } from "jwt-decode";
const LayoutWrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  return (
    <div className="flex flex-col flex-1 h-full">
      <Header />
      <main className="my-4 flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWrapper;
