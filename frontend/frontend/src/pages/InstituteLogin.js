import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import loadingImg from "../assets/loader.gif";
import "./InstituteLogin.css";
import api from "../utils/api";

const InstituteLogin = () => {
  const [formData, setFormData] = useState({
    instituteName: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/institutes/login",
        formData
      );
      // const res = await api.post("api/institutes/login", formData);
      console.log(res);
      toast.success(res.data.message);
      localStorage.setItem("instituteName", res.data.instituteName);
      localStorage.setItem("token", res.data.token);
      window.location = "/dashboard";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="inst_login_page">
      <div className="inst_login_form_container">
        <div className="inst_login_form">
          <h2>Institute Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Institute Name"
              id="instituteName"
              name="instituteName"
              onChange={handleChange}
              value={formData.instituteName}
              required
              className="inst_login_input"
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              className="inst_login_input"
            />
            {error && <div className="error_msg">{error}</div>}
            {isLoading && (
              <div className="gifcontainer">
                <img src={loadingImg} className="gif" alt="Loading" />
              </div>
            )}
            <button className="inst_login_button bg-custom-blue" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstituteLogin;
