import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";

function RequestsDisplay({ requestList, approveRequest }) {
	const [otpList, setOtpList] = useState([]);

	const handleInputChange = (event, index) => {
		const { value } = event.target;
		const updatedOtpList = [...otpList];
		updatedOtpList[index] = value;
		setOtpList(updatedOtpList);
	};

	useEffect(() => {
		// Initialize OTP list with empty strings for each request
		setOtpList(Array(requestList.length).fill(""));
	}, [requestList]);

	return (
		<div className="overflow-y-auto">
			{requestList.map((request, index) => (
				<div
					key={request.CSN}
					className="bg-white p-4 my-4 rounded shadow-lg flex flex-col justify-center items-center"
				>
					<p className="font-semibold text-2xl">
						{" "}
						{/* Increased text font size */}
						Request from {request.verifier} for certificate:{" "}
						{request.certificateName}
					</p>
					<div className="flex items-center mt-4">
						{" "}
						{/* Increased top margin */}
						<p className="mr-2 text-2xl">OTP:</p>{" "}
						{/* Increased text font size */}
						<input
							type="text"
							value={otpList[index] || ""}
							onChange={(event) =>
								handleInputChange(event, index)
							}
							className="border border-gray-400 p-2 rounded w-40"
						/>
						<button
							className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
							onClick={() =>
								approveRequest(request, otpList[index])
							}
						>
							Grant Access
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

function VerificationRequests() {
	const navigate = useNavigate();
	const [lengthiszero, setlengthiszero] = useState(true);
	const [requestList, setRequestList] = useState([]);

	const handleLogout = () => {
		localStorage.removeItem("studentName");
		localStorage.removeItem("token");
		localStorage.removeItem("mail");
		navigate("/");
	};

	const certificatePage = () => {
		navigate("/studentPage");
	};

	async function fetchRequests() {
		try {
			const response = await fetch(
				"http://localhost:4000/api/certificate/pendingCertificates",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						emailid: localStorage.getItem("mail"),
						status: "valid",
						checkotp: "false",
					},
				}
			);

			if (!response.ok) {
				throw new Error(
					`Failed to retrieve requests. Status: ${response.status}`
				);
			}

			const responseData = await response.json();
			// console.log(responseData);
			if (!responseData.success) {
				throw new Error("Failed to retrieve requests.");
			}

			const requestListData = responseData.pendingCertificates;
			setlengthiszero(false);

			if (requestListData.length === 0) {
				setlengthiszero(true);
			}

			setRequestList(requestListData);
		} catch (error) {
			console.error("Error occurred while retrieving requests:", error);
		}
	}

	const approveRequest = async (request, otp) => {
		try {
			const response = await fetch(
				"http://localhost:4000/api/certificate/setCheckOTP",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						...request, // Append the request object
						otp: otp, // Append the OTP
					},
				}
			);
			console.log(response);
			if (!response.ok) {
				alert("Incorect OTP. Please try again.");
			}
			fetchRequests();
			// Handle success response if needed
		} catch (error) {
			console.error("Error occurred while approving request:", error);
		}
	};

	useEffect(() => {
		// Call fetchRequests function when Grant Access button is clicked
		if (requestList.length === 0) {
			const interval = setInterval(fetchRequests, 2000);
			return () => clearInterval(interval);
		}
	}, [requestList]);

	return (
		<div className="bg-gradient-to-b from-blue-200 to-blue-100 min-h-screen">
			<div className="bg-black flex justify-between items-center px-5 w-full">
				<img src={logo} alt="LACertiSafe Logo" className="logo-image" />
				<div className="text-center flex flex-col justify-center items-center">
					<h2 className="text-5xl font-semibold text-blue-800 text-yellow-500 shadow-text">
						Welcome
					</h2>
					<h1 className="text-4xl font-semibold text-blue-800 text-yellow-500 shadow-text">
						{localStorage.getItem("studentName")}
					</h1>
				</div>
				<div className={"button-container"}>
					<button
						className={"designbutton"}
						onClick={certificatePage}
					>
						View Certificates
					</button>
					<button className={"logoutbutton"} onClick={handleLogout}>
						Logout
					</button>
				</div>
			</div>
			<div className="py-10 flex justify-center items-center">
				{lengthiszero ? ( // Display message when no requests are found
					<p>No Approval Requests</p>
				) : (
					<RequestsDisplay
						requestList={requestList}
						approveRequest={approveRequest}
					/>
				)}
			</div>
		</div>
	);
}

export default VerificationRequests;
