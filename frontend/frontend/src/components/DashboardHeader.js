import React, { useState } from "react";
import "./DashboardHeader.css";
import "./button.css";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    templateTitle: "",
    width: 600,
    height: 450,
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const create = () => {
    navigate("/design", {
      state: {
        type: "create",
        templateTitle: state.templateTitle,
        width: state.width,
        height: state.height,
      },
    });
  };

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("instituteName");
    navigate("/");
  };

  return (
    <div className={"header"}>
      <img src={logo} alt="LACertiSafe Logo" className="logo-image" />
      <div className={"button-container"}>
        <button className={"designbutton"} onClick={toggleForm}>
          Create Custom Design
        </button>
        <button className={"logoutbutton"} onClick={handleLogout}>
          Logout
        </button>
      </div>
      {showForm && (
        <>
          <div className="overlay" onClick={toggleForm}></div>
          <form
            className={`custom-design-form ${showForm ? "visible" : ""}`}
            onSubmit={create}
          >
            <h2 className="form-title">Set Template Data</h2>
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="templateTitle">Title</label>
                <input
                  type="text"
                  id="templateTitle"
                  name="templateTitle"
                  value={state.templateTitle}
                  onChange={inputHandle}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="width">Width</label>
                <input
                  type="number"
                  id="width"
                  name="width"
                  value={state.width}
                  onChange={inputHandle}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="height">Height</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={state.height}
                  onChange={inputHandle}
                  required
                />
              </div>
            </div>
            <button type="submit" className="button">
              Create Design
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default DashboardHeader;
