// import React, { useState, useEffect } from "react";
// import Image from "./Image";
// import api from "../utils/api";

// const BackgroundImages = ({ setImage, type }) => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const get_images = async () => {
//       try {
//         const { data } = await api.get("/api/designs/background-images");
//         setImages(data.images);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     get_images();
//   }, []);

//   return (
//     <div className="h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
//       <Image setImage={setImage} type={type} images={images} />;
//     </div>
//   );
// };

// export default BackgroundImages;

import React, { useEffect, useState } from "react";
import Image from "./Image";
import api from "../utils/api";
import BarLoader from "react-spinners/BarLoader";
import toast from "react-hot-toast";

const BackgroundImages = ({ setImage, type }) => {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);

  const image_upload = async (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      try {
        setLoader(true);
        const { data } = await api.post(
          "/api/designs/add-background-image",
          formData
        );
        setImages([...images, data.userImage]);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const get_images = async () => {
      try {
        const { data } = await api.get("/api/designs/get-background-image");
        setImages(data.images);
      } catch (error) {
        console.log(error);
      }
    };
    get_images();
  }, []);

  return (
    <div>
      <div className="w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3">
        <label className="text-center cursor-pointer" htmlFor="image">
          Upload Custom Template
        </label>
        <input
          readOnly={loader}
          onChange={image_upload}
          type="file"
          id="image"
          className="hidden"
        />
      </div>
      {loader && (
        <div className="flex justify-center items-center mb-2">
          <BarLoader color="#fff" />
        </div>
      )}
      <div className="h-[80vh] overflow-x-auto flex justify-around items-start scrollbar-hide">
        <Image setImage={setImage} type={type} images={images} />
      </div>
    </div>
  );
};

export default BackgroundImages;
