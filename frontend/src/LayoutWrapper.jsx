import React, { useEffect } from "react";
import Header from "./components/layout-ui/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTokens } from "./store/auth.slice";

const LayoutWrapper = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      dispatch(setTokens({ accessToken, refreshToken }));
    }
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
