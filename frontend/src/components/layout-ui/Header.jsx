import React, { useState } from "react";
import Button from "../form-ui/Button";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { clearAuth } from "../../store/auth.slice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  console.log({ auth });
  const user = auth?.user?.[0] || auth?.user || {};
  const logoutHandler = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  return (
    <header className="flex gap-4 items-center border-b border-b-slate-400 pb-3">
      <div className="font-medium text-2xl mr-auto">Brand.</div>
      <div className="text-slate-800">
        Hi <span className="font-medium">{user.email}!</span>
      </div>

      <Button onClick={() => setShow(true)} variant="outlined">
        Logout
      </Button>

      <Modal show={show} setShow={setShow} title="Oh! Sure?">
        <div className="flex flex-col items-end">
          <p className="w-full text-left">You want log out?</p>
          <Button onClick={logoutHandler}>Damn, Sure!</Button>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
