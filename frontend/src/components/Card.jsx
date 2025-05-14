import React from "react";

const Card = ({ id, price, name, img_url }) => {
  return (
    <article className=" flex flex-col gap-4 pb-4 border border-slate-500 cursor-pointer">
      <img
        src={img_url}
        className="h-48 bg-gray-100 border-transparent"
        alt=""
      />
      <div className="flex justify-between px-2">
        <p className="font-medium">{name}</p>
        <p>Rs. {price}</p>
      </div>
    </article>
  );
};

export default Card;
