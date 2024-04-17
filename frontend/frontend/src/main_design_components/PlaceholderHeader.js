import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import api from "../utils/api";
import toast from "react-hot-toast";
import logo from "../assets/logo.jpeg";

const Header = ({ components, design_id, templateTitle }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const saveImage = async () => {
    const getDiv = document.getElementById("main_design");
    const image = await htmlToImage.toBlob(getDiv);

    if (image) {
      const obj = {
        design: components,
      };
      console.log(image);
      const formData = new FormData();
      console.log(JSON.stringify(obj));
      formData.append("design", JSON.stringify(obj));
      formData.append("image", image);

      try {
        setLoader(true);
        const { data } = await api.put(
          `/api/designs/update-user-design/${design_id}`,
          formData
        );
        toast.success(data.message);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        toast.error(error.response.data.message);
      }
    }
  };

  const downloadImage = async () => {
    const getDiv = document.getElementById("main_design");
    console.log(getDiv);
    const dataUrl = await htmlToImage.toJpeg(getDiv, {
      style: {
        transform: "scale(1)",
      },
    });

    var link = document.createElement("a");
    link.download = templateTitle;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-[60px] bg-[#18191B] w-full">
      <div className="flex justify-between px-10 items-center text-gray-300 h-full">
        <Link to="/dashboard">
          <img src={logo} alt="LACertiSafe Logo" className="w-40 h-20" />
        </Link>
        <span className="text-xl">Placeholder Page</span>
        <div className="flex justify-center items-center gap-2 text-gray-300">
          <button
            disabled={loader}
            onClick={saveImage}
            className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            {loader ? "Loading..." : "Save"}
          </button>
          <button
            onClick={downloadImage}
            className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
