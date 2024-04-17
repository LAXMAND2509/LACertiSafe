import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const DesignPageProjectItems = ({ design, type, delete_design }) => {
	return (
		<div
			className={`relative group w-full  ${
				type ? "h-[100px]" : " h-[170px] px-2"
			}`}
		>
			<Link
				to={`/design/${design._id}/edit_design`}
				className={`w-full h-full block bg-[#ffffff12] rounded-md p-4"
        }`}
			>
				<img
					className="w-full h-full rounded-md overflow-hidden"
					src={design.image_url}
					alt=""
				/>
			</Link>
			<p className="text-yellow-400 text-lg text-center">
				{design.templateTitle}
			</p>
			<div
				onClick={() => delete_design(design._id)}
				className="absolute hidden cursor-pointer top-4 right-5 text-red-500 p-2 transition-all duration-500 group-hover:block"
			>
				<FaTrash style={{ width: "15px", height: "15px" }} />
			</div>
		</div>
	);
};

export default DesignPageProjectItems;
