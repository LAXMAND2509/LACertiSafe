import "./DashboardContent.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Item from "../main_design_components/Item";
import toast from "react-hot-toast";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const DashboardContent = () => {
  const instituteName = localStorage.getItem("instituteName");

  const [designs, setDesign] = useState([]);
  const navigate = useNavigate();
  const [state, setState] = useState({
    width: 0,
    height: 0,
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 992, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  const [show, setShow] = useState(false);

  const get_user_design = async () => {
    try {
      const { data } = await api.get("/api/designs/user-designs");
      console.log(data);
      setDesign(data.designs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_user_design();
  }, []);

  const delete_design = async (design_id) => {
    try {
      const { data } = await api.put(
        `/api/designs/delete-user-design/${design_id}`
      );
      toast.success(data.message);
      get_user_design();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="dashbody">
      <div className="dashtext">
        <h2>Welcome</h2>
        <h1>{instituteName}</h1>
      </div>

      <div className="scrollable-section sec1">
        <h3 className="mx-8">Recently Used Designs:</h3>
        {designs.length === 0 ? (
          <div className="flex justify-center items-center h-[170px] bg-gray-800">
            <p className="text-3xl text-white">No Designs Found</p>
          </div>
        ) : (
          <div className="bg-gray-800">
            <Carousel
              autoPlay={true}
              infinite={true}
              responsive={responsive}
              transitionDuration={150}
            >
              {designs.map((d, i) => (
                <Item delete_design={delete_design} design={d} key={i} />
              ))}
            </Carousel>
          </div>
        )}
      </div>

      {/* <div className="scrollable-section sec2">
        <h3 className="mx-8">Templates</h3>
        <div className="bg-gray-800">
          <Carousel
            autoPlay={true}
            infinite={true}
            responsive={responsive}
            transitionDuration={300}
          >
            {designs.map((d, i) => (
              <Item delete_design={delete_design} design={d} key={i} />
            ))}
          </Carousel>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardContent;
