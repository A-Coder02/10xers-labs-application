import React, { useState } from "react";
import Button from "../form-ui/Button";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { clearAuth } from "../../store/auth.slice";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const user = auth?.user?.[0] || auth?.user || {};
  const isAdmin = user?.role === "admin";
  const logoutHandler = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  return (
    <header className="flex gap-4 items-center sticky top-0 z-50 py-2 px-4 bg-white border-b border-b-slate-400 pb-3">
      <div
        className="font-medium md:text-2xl mr-auto cursor-pointer"
        onClick={() => navigate("/")}
      >
        MobiWiki
      </div>
      <div className="text-slate-800 hidden md:block">
        Hi <span className="font-medium">{user.email}!</span>
      </div>
      {isAdmin && (
        <Button size="sm" onClick={() => navigate("/portal")}>
          Go to Portal
        </Button>
      )}
      <div className="hidden md:block">
        {location.pathname === "/portal" && (
          <Button size="sm" onClick={() => navigate("/")}>
            Home
          </Button>
        )}
      </div>

      <Button size="sm" onClick={() => setShow(true)} variant="outlined">
        Logout
      </Button>

      <Modal show={show} setShow={setShow} title="Oh! Sure?">
        <div className="flex flex-col items-end">
          <p className="w-full text-left mb-8">You want log out?</p>
          <Button onClick={logoutHandler}>Damn, Sure!</Button>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
