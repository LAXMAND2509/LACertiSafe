import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import api from "../utils/api";
import toast from "react-hot-toast";
import logo from "../assets/logo.jpeg";
import { Buffer } from "buffer";
import { decode } from "base64-arraybuffer";

const Header = ({ components, design_id, templateTitle }) => {
  const navigate = useNavigate();
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);

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
        setLoader1(true);
        const { data } = await api.put(
          `/api/designs/update-user-design/${design_id}`,
          formData
        );
        toast.success(data.message);
        setLoader1(false);
      } catch (error) {
        setLoader1(false);
        toast.error(error.response.data.message);
      }
    }
  };

  // before var link
  // console.log(dataUrl);
  // // Remove data:image/jpeg;base64, prefix if present
  // const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, "");

  // // Decode base64 string to binary string
  // const binaryString = atob(base64Data);

  // // Convert binary string to Uint8Array (buffer)
  // const buffer = Buffer.from(binaryString, "binary");

  // // Now you have the buffer in the required format
  // console.log(buffer); // This will log the buffer in the format you specified

  const downloadImage = async () => {
    const getDiv = document.getElementById("main_design");
    // console.log(getDiv);
    const dataUrl = await htmlToImage.toJpeg(getDiv, {
      style: {
        transform: "scale(1)",
      },
    });

    console.log(dataUrl);
    // Remove data:image/jpeg;base64, prefix if present
    // const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, "");

    // Decode base64 string to binary string
    // const binaryString = atob(base64Data);

    // Convert binary string to Uint8Array (buffer)
    // const buffer = Buffer.from(binaryString, "binary");

    // Now you have the buffer in the required format
    // console.log(buffer); // This will log the buffer in the format you specified

    var link = document.createElement("a");
    link.download = templateTitle;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const proceedToPlaceholder = async () => {
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
        // Show loading toast using toast.promise
        await toast.promise(
          api.put(`/api/designs/update-user-design/${design_id}`, formData),
          {
            loading: "....Proceeding to the Placeholder Page....",
            success: () => {
              // Navigate to the placeholder page upon successful API call
              navigate(`/design/${design_id}/placeholder`);
              return "!!!Success!!!";
            },
            error: (error) => {
              // Handle API error
              toast.error(error.response.data.message);
              throw error;
            },
          }
        );
      } catch (error) {
        // Handle any errors
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <div className="h-[60px] bg-[#18191B] w-full">
      <div className="flex justify-between px-10 items-center text-gray-300 h-full">
        <Link to="/dashboard">
          <img src={logo} alt="LACertiSafe Logo" className="w-40 h-20" />
        </Link>
        <span className="text-xl">Cerificate Design</span>
        <div className="flex justify-center items-center gap-2 text-gray-300">
          <button
            disabled={loader1}
            onClick={saveImage}
            className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            {loader1 ? "Loading..." : "Save"}
          </button>
          <button
            onClick={downloadImage}
            className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            Download
          </button>
          <button
            disabled={loader2}
            onClick={proceedToPlaceholder}
            className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            {loader2 ? "Loading..." : "Proceed To Placeholder"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
