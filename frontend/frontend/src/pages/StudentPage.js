import React, { useEffect, useState } from "react";
import "../components/button.css";
import logo from "../assets/logo.jpeg";
import "../components/DashboardHeader.css";
import { useNavigate } from "react-router-dom";

function ImageDisplay({ fileList }) {
	function arrayBufferToBase64(buffer) {
		const binary = [];
		const bytes = new Uint8Array(buffer);
		bytes.forEach((byte) => binary.push(String.fromCharCode(byte)));
		return btoa(binary.join(""));
	}

	return (
		<div
			id="imageDisplay"
			className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
		>
			{fileList.map((file, index) => (
				<div
					key={index}
					className="p-4 border border-gray-300 rounded-lg"
				>
					<img
						src={`data:image/jpeg;base64,${arrayBufferToBase64(
							file.fileBuffer.data
						)}`}
						alt={`Certificate ${index}`}
						className="w-full h-auto"
					/>
					<p className="mt-2 text-lg font-semibold text-center">
						Certificate Name: {file.filename}
					</p>
					<p className="text-gray-600 text-center">
						Issuer: {file.college}
					</p>
				</div>
			))}
		</div>
	);
}

function StudentPage() {
	const navigate = useNavigate();

	const [fileList, setFileList] = useState([]);
	const handleLogout = () => {
		localStorage.removeItem("studentName");
		localStorage.removeItem("token");
		localStorage.removeItem("mail");
		navigate("/");
	};

	const requestPage = () => {
		navigate("/verificationRequests");
	};

	async function retrieveImage() {
		try {
			const response = await fetch(
				"http://localhost:4000/api/certificate/getFiles",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						emailid: localStorage.getItem("mail"),
					},
				}
			);

			if (!response.ok) {
				throw new Error(
					`Failed to retrieve files. Status: ${response.status}`
				);
			}

			const responseData = await response.json();
			// console.log(responseData);
			if (!responseData.success) {
				throw new Error("Failed to retrieve files.");
			}

			const fileListData = responseData.fileList;
			if (fileListData.length === 0) {
				throw new Error("No files found for the given email.");
			}

			setFileList(fileListData);
		} catch (error) {
			console.error("Error occurred while retrieving image:", error);
		}
	}

	useEffect(() => {
		retrieveImage(); // Call retrieveImage function on component mount
	}, []);

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
					<button className={"designbutton"} onClick={requestPage}>
						Approve Requests
					</button>
					<button className={"logoutbutton"} onClick={handleLogout}>
						Logout
					</button>
				</div>
			</div>
			<ImageDisplay fileList={fileList} />
		</div>
	);
}

export default StudentPage;
