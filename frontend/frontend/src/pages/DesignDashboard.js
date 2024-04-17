import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardContent from "../components/DashboardContent";

const DesignDashboard = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location = "/";
  }

  return (
    <div>
      <DashboardHeader />
      <DashboardContent />
    </div>
  );
};

export default DesignDashboard;
