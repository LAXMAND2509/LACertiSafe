import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import loadingImg from "../assets/loader.gif";
import "./InstituteLogin.css";

const VerifierHome = () => {
	const [formData, setFormData] = useState({
		verifierName: "",
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
				"http://localhost:8000/api/verifier/register",
				formData
			);
			// const res = await api.post("api/institutes/login", formData);
			console.log(res);
			toast.success(res.data.message);
			localStorage.setItem("verifierName", res.data.verifierName);
			localStorage.setItem("token", res.data.token);
			window.location = "/verifierHistory";
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
					<h2>Verifier Home</h2>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Verifier Name"
							id="verifierName"
							name="verifierName"
							onChange={handleChange}
							value={formData.verifierName}
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
								<img
									src={loadingImg}
									className="gif"
									alt="Loading"
								/>
							</div>
						)}
						<div className="flex flex-col">
							<button
								className="inst_login_button bg-custom-blue w-fit"
								type="submit"
							>
								Authenticate
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default VerifierHome;
