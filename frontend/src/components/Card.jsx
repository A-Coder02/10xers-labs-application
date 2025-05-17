import React, { useState } from "react";
import Modal from "./layout-ui/Modal";

/**
 * A Card component that displays product details and opens a modal on click.
 *
 * @param {Object} props - The properties object.
 * @param {number|string} props.id - The unique identifier for the product.
 * @param {number} props.price - The price of the product.
 * @param {string} props.name - The name of the product.
 * @param {string} props.image - The image URL of the product.
 * @param {string} props.description - The description of the product.
 * @returns {JSX.Element} The rendered card component with a modal on click.
 */
const Card = ({ id, price, name, image, description }) => {
  const [show, setShow] = useState(false);

  console.log({ image });

  /**
   * Opens the modal by setting the state to true.
   */
  const openModalHandler = () => {
    setShow(true);
  };

  return (
    <>
      <article
        onClick={openModalHandler}
        className="flex flex-col gap-4 pb-4 border border-slate-500 cursor-pointer"
      >
        <img
          src={image}
          className="bg-gray-100 border-transparent w-full aspect-square"
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
        <img
          src={image}
          className="bg-slate-100 my-4 aspect-video object-contain w-full"
        />
        <p>{description}</p>
      </Modal>
    </>
  );
};

export default Card;
