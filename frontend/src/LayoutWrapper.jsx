import React from "react";
import Header from "./components/layout-ui/Header";
import { Outlet } from "react-router-dom";

const LayoutWrapper = () => {
  return (
    <div className="flex flex-col flex-1 h-full">
      <Header />
      <main className="py-4 flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWrapper;
