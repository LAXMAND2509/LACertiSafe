import React from "react";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DefaultOutletHeader from "./components/DefaultOutletHeader";
import Landing from "./pages/Landing";
import InstituteLogin from "./pages/InstituteLogin";
import DesignDashboard from "./pages/DesignDashboard";
import MainDesign from "./pages/MainDesign";
import CreateDesign from "./main_design_components/CreateDesign";
import PlaceholderPage from "./main_design_components/PlaceholderPage";
import StudentLogin from "./pages/StudentLogin";
import StudentPage from "./pages/StudentPage";
import VerificationRequests from "./pages/VerificationRequests";
import VerifierHome from "./pages/VerifierHome";
import VerifierHistory from "./pages/VerifierHistory";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<DefaultOutletHeader />}>
					{/* Default Route */}
					<Route index element={<Landing />} />
					<Route path="institutelogin" element={<InstituteLogin />} />
					<Route path="dashboard" element={<DesignDashboard />} />
					<Route path="design" element={<CreateDesign />} />
					<Route
						path="/design/:design_id/edit_design"
						element={<MainDesign />}
					/>
					<Route
						path="/design/:design_id/placeholder"
						element={<PlaceholderPage />}
					/>
					<Route path="studentlogin" element={<StudentLogin />} />
					<Route path="studentPage" element={<StudentPage />} />
					<Route
						path="verificationRequests"
						element={<VerificationRequests />}
					/>
					<Route path="verifierHome" element={<VerifierHome />} />
					<Route
						path="verifierHistory"
						element={<VerifierHistory />}
					/>
				</Route>
			</Routes>
			<ToastContainer autoClose={1700} />
		</div>
	);
}

export default App;
