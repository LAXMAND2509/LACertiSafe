import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Item = ({ design, type, delete_design }) => {
  return (
    <div
      className={`relative group w-full  ${
        type ? "h-[120px]" : "h-[180px] px-1"
      }`}
    >
      <Link
        to={`/design/${design._id}/edit_design`}
        className={`w-full h-full block bg-[#ffffff12] rounded-md ${
          type ? "" : "p-4"
        }`}
      >
        <img
          className="w-full h-[150px] rounded-md overflow-hidden"
          src={design.image_url}
          alt=""
        />
        <p className="text-yellow-400 text-2xl text-center">
          {design.templateTitle}
        </p>
      </Link>
      <div
        onClick={() => delete_design(design._id)}
        className="absolute hidden cursor-pointer top-4 right-5 text-red-500 p-2 transition-all duration-500 group-hover:block"
      >
        <FaTrash style={{ width: "15px", height: "15px" }} />
      </div>
    </div>
  );
};

export default Item;
