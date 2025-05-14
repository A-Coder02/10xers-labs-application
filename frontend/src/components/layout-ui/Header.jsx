import React from "react";
import Button from "../form-ui/Button";

const Header = () => {
  const logoutHandler = () => {};

  return (
    <header className="flex justify-between items-center border-b border-b-slate-400 pb-3">
      <div className="font-medium text-2xl">Brand.</div>
      <Button onClick={logoutHandler} variant="outlined">
        Logout
      </Button>
    </header>
  );
};

export default Header;
