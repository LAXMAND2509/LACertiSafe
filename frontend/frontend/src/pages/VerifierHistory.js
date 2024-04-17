import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import "../components/button.css";
import logo from "../assets/logo.jpeg";
import "../components/DashboardHeader.css";
import { useNavigate } from "react-router-dom";

const VerifierHistory = () => {
	const [verificationDetails, setVerificationDetails] = useState([]);
	const [error, setError] = useState("");
	const [verificationResult, setVerificationResult] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchVerificationDetails = async () => {
			try {
				const response = await axios.get(
					// Use axios.get instead of api.get
					"http://localhost:4000/api/certificate/verifyStatus",
					{
						headers: {
							verifier: localStorage.getItem("verifierName"),
						},
					}
				);

				if (!response.data.success) {
					throw new Error("Failed to fetch verification details.");
				}

				const sanitizedDetails = sanitizeVerificationDetails(
					response.data.verificationDetails
				);
				setVerificationDetails(sanitizedDetails);
			} catch (error) {
				console.error(
					"Error occurred while fetching verification details:",
					error
				);
				setError(
					"Failed to fetch verification details. Please try again."
				);
			}
		};

		const interval = setInterval(fetchVerificationDetails, 1000);

		return () => clearInterval(interval);
	}, []);

	// Function to sanitize verification details and select required fields
	const sanitizeVerificationDetails = (details) => {
		return details.map((detail) => ({
			EmailID: detail.emailId,
			Status: detail.status,
			Date: formatDate(detail.date), // Format date
			Verifier: detail.verifier,
			CertificateName: detail.certificateName,
			Details: detail.Details, // Include certificateName
		}));
	};

	// Function to format date
	const formatDate = (timestamp) => {
		const date = new Date(timestamp);
		return format(date, "yyyy-MM-dd HH:mm:ss");
	};

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("verifierName");
		localStorage.removeItem("token");
		navigate("/");
	};
	async function getFileAsBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result.split(",")[1]);
			reader.onerror = (error) => reject(error);
		});
	}
	const uploadFile = async () => {
		try {
			setIsLoading(true);

			const fileInput = document.getElementById("fileInput");
			const file = fileInput.files[0];
			if (!file) {
				alert("Please select a file.");
				setIsLoading(false);
				return;
			}
			const emailInput = document.getElementById("emailInput").value;

			const certificateList = [];
			for (let i = 1; i <= 1; i++) {
				const certificateObj = {
					fileInput: await getFileAsBase64(file),
					emailId: emailInput,
					verifier: localStorage.getItem("verifierName"), // Add verifier to each certificate object
				};
				certificateList.push(certificateObj);
			}
			const certificateListJSON = JSON.stringify(certificateList);

			const formData = new FormData();
			formData.append("verifier", localStorage.getItem("verifierName"));
			formData.append("list", certificateListJSON);

			const response = await axios.post(
				"http://localhost:4000/api/certificate/verifyFile",
				formData
			);

			if (!response.data.success) {
				throw new Error("Failed to verify file.");
			}
			// alert("Certificate verification initiated successfully!");
			setVerificationResult("File verified successfully!");
		} catch (error) {
			console.error("Error occurred during file verification:", error);
			setVerificationResult("Failed to verify file. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-gray-100">
			<div className="bg-black flex justify-between items-center px-5 w-full">
				<img src={logo} alt="LACertiSafe Logo" className="logo-image" />
				<div className="text-center flex flex-col justify-center items-center">
					<h2 className="text-5xl font-semibold text-blue-800 text-yellow-500 shadow-text">
						Welcome
					</h2>
					<h1 className="text-4xl font-semibold text-blue-800 text-yellow-500 shadow-text">
						{localStorage.getItem("verifierName")}
					</h1>
				</div>
				<div className={"button-container"}>
					<button className={"logoutbutton"} onClick={handleLogout}>
						Logout
					</button>
				</div>
			</div>
			<form
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2 mt-6 max-w-lg mx-auto"
				id="fileUploadForm"
				encType="multipart/form-data"
			>
				<div className="mb-4">
					<label
						htmlFor="emailInput"
						className="block text-gray-700 text-sm font-bold mb-2 text-center"
					>
						Enter Mail ID of Certificate Holder
					</label>
					<input
						type="email"
						id="emailInput"
						name="emailInput"
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="fileInput"
						className="block text-gray-700 text-sm font-bold mb-2 text-center"
					>
						Upload Certificate Image
					</label>
					<input
						type="file"
						id="fileInput"
						name="fileInput"
						accept=".jpg, .jpeg, .png"
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="flex justify-center">
					<button
						type="button"
						onClick={uploadFile}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						disabled={isLoading}
					>
						{isLoading ? "Uploading..." : "Verify"}
					</button>
				</div>
				{/* <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="w-full h-[40px] flex justify-center items-center bg-purple-600 rounded-sm text-white cursor-pointer"
          >
            Upload Certificate
            <input
              id="file-upload"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={uploadFile}
              className="hidden"
            />
          </label>
        </div> */}
			</form>
			<div className="px-8 pt-3">
				{error && <div className="text-red-600">{error}</div>}
				<div className="bg-white shadow-md rounded p-8">
					<h2 className="text-2xl mb-4 text-center">
						Verification Details
					</h2>
					<table className="w-full border-collapse mb-4">
						<thead>
							<tr>
								{[
									"EmailID",
									"Status",
									"Date",
									"Verifier",
									"CertificateName",
									"Details",
								].map((field) => (
									<th
										key={field}
										className="bg-gray-200 text-left px-4 py-2"
									>
										{field}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{verificationDetails.map((detail, index) => (
								<tr key={index}>
									{Object.values(detail).map(
										(value, index) => (
											<td
												key={index}
												className="border px-4 py-2"
											>
												{value}
											</td>
										)
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default VerifierHistory;
