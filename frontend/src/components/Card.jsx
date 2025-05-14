import React, { useState } from "react";
import Modal from "./layout-ui/Modal";

const Card = ({ id, price, name, image, description }) => {
  const [show, setShow] = useState(false);

  const openModalHandler = () => {
    setShow(true);
  };

  return (
    <>
      <article
        onClick={openModalHandler}
        className=" flex flex-col gap-4 pb-4 border border-slate-500 cursor-pointer"
      >
        <img
          src={image}
          className="h-48 bg-gray-100 border-transparent"
          alt=""
        />
        <div className="flex justify-between px-2">
          <p className="font-medium">{name}</p>
          <p>Rs. {price}</p>
        </div>
      </article>
      <Modal show={show} setShow={setShow} title={`#${id || 0}`}>
        <div className="flex justify-between">
          <p className="font-medium">{name}</p>
          <p>Rs.{price}</p>
        </div>
        <img src={image} className="bg-slate-100 my-4 aspect-video w-full" />
        <p>{description}</p>
      </Modal>
    </>
  );
};

export default Card;
