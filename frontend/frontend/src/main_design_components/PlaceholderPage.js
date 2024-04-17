import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { useParams } from "react-router-dom";
import { BsGrid1X2, BsFillImageFill, BsFolder } from "react-icons/bs";
import { FaShapes, FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { IoDuplicateOutline } from "react-icons/io5";
import { TfiText } from "react-icons/tfi";
import { BiEdit } from "react-icons/bi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RxTransparencyGrid } from "react-icons/rx";
import * as XLSX from "xlsx";
import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";
import axios from "axios";

import Header from "./PlaceholderHeader";
import FixedComponents from "../main_design_components/FixedComponents";

import api from "../utils/api";

const PlaceholderPage = () => {
	const [selectItem, setSelectItem] = useState("");
	const { design_id } = useParams();
	const [state, setState] = useState("");
	const [current_component, setCurrentComponent] = useState("");
	const [color, setColor] = useState("");
	const [rotate, setRotate] = useState(0);
	const [left, setLeft] = useState("");
	const [top, setTop] = useState("");
	const [width, setWidth] = useState("");
	const [height, setHeight] = useState("");
	const [opacity, setOpacity] = useState("");
	const [zIndex, setzIndex] = useState("");
	const [templateTitle, setTemplateTitle] = useState("");

	const [padding, setPadding] = useState("");
	const [fontSize, setFontSize] = useState("");
	const [weight, setWeight] = useState("");
	const [placeholder, setPlaceholder] = useState("");
	const [fontStyle, setFontStyle] = useState("");

	const [show, setShow] = useState({
		status: true,
		name: "",
	});

	const [components, setComponents] = useState([
		{
			name: "main_frame",
			type: "rect",
			id: Math.floor(Math.random() * 100 + 1),
			height: 450,
			width: 650,
			z_index: 1,
			color: "#fff",
			image: "",
			setCurrentComponent: (a) => setCurrentComponent(a),
		},
	]);

	const setElements = (type, name) => {
		setState(type);
		setShow({
			state: false,
			name,
		});
	};

	const moveElement = (id, currentInfo) => {
		setCurrentComponent(currentInfo);
		let isMoving = true;

		const currentDiv = document.getElementById(id);

		const mouseMove = ({ movementX, movementY }) => {
			setSelectItem("");
			const getStyle = window.getComputedStyle(currentDiv);
			const left = parseInt(getStyle.left);
			const top = parseInt(getStyle.top);
			if (isMoving) {
				currentDiv.style.left = `${left + movementX}px`;
				currentDiv.style.top = `${top + movementY}px`;
			}
		};

		const mouseUp = (e) => {
			setSelectItem(currentInfo.id);
			isMoving = false;
			window.removeEventListener("mousemove", mouseMove);
			window.removeEventListener("mouseup", mouseUp);
			setLeft(parseInt(currentDiv.style.left));
			setTop(parseInt(currentDiv.style.top));
		};

		window.addEventListener("mousemove", mouseMove);
		window.addEventListener("mouseup", mouseUp);
		currentDiv.ondragstart = function () {
			return false;
		};
	};

	const resizeElement = (id, currentInfo) => {
		setCurrentComponent(currentInfo);

		let isMoving = true;

		const currentDiv = document.getElementById(id);

		const mouseMove = ({ movementX, movementY }) => {
			const getStyle = window.getComputedStyle(currentDiv);
			const width = parseInt(getStyle.width);
			const height = parseInt(getStyle.height);
			if (isMoving) {
				currentDiv.style.width = `${width + movementX}px`;
				currentDiv.style.height = `${height + movementY}px`;
			}
		};

		const mouseUp = (e) => {
			isMoving = false;
			window.removeEventListener("mousemove", mouseMove);
			window.removeEventListener("mouseup", mouseUp);
			setWidth(parseInt(currentDiv.style.width));
			setHeight(parseInt(currentDiv.style.height));
		};

		window.addEventListener("mousemove", mouseMove);
		window.addEventListener("mouseup", mouseUp);
		currentDiv.ondragstart = function () {
			return false;
		};
	};

	const rotateElement = (id, currentInfo) => {
		setCurrentComponent(currentInfo);

		const target = document.getElementById(id);

		const mouseMove = ({ movementX, movementY }) => {
			const getStyle = window.getComputedStyle(target);

			const trans = getStyle.transform;

			const values = trans.split("(")[1].split(")")[0].split(",");

			const angle = Math.round(
				Math.atan2(values[1], values[0]) * (180 / Math.PI)
			);

			let deg = angle < 0 ? angle + 360 : angle;

			if (movementX) {
				deg = deg + movementX;
			}
			target.style.transform = `rotate(${deg}deg)`;
		};

		const mouseUp = (e) => {
			window.removeEventListener("mousemove", mouseMove);
			window.removeEventListener("mouseup", mouseUp);

			const getStyle = window.getComputedStyle(target);
			const trans = getStyle.transform;
			const values = trans.split("(")[1].split(")")[0].split(",");
			const angle = Math.round(
				Math.atan2(values[1], values[0]) * (180 / Math.PI)
			);
			let deg = angle < 0 ? angle + 360 : angle;
			setRotate(deg);
		};

		window.addEventListener("mousemove", mouseMove);
		window.addEventListener("mouseup", mouseUp);

		target.ondragstart = function () {
			return false;
		};
	};

	const removeComponent = (id) => {
		const temp = components.filter((c) => c.id !== id);
		setCurrentComponent("");
		setComponents(temp);
	};

	const duplicate = (current) => {
		if (current) {
			setComponents([...components, { ...current, id: Date.now() }]);
		}
	};

	const opacityHandle = (e) => {
		setOpacity(parseFloat(e.target.value));
	};

	const add_placeholder = (name, type) => {
		setCurrentComponent("");
		const id = Date.now();
		const style = {
			id: id,
			name: name,
			type,
			left: 250,
			top: 200,
			opacity: 1,
			rotate,
			z_index: 10,
			padding: 6,
			fontSize: 22,
			fontStyle: "Arial",
			italic: false,
			underline: false,
			title: "???",
			weight: 400,
			color: "#3c3c3d",
			setCurrentComponent: (a) => setCurrentComponent(a),
			moveElement,
			resizeElement,
			rotateElement,
		};

		setWeight("");
		setFontSize("");
		setFontStyle("");
		setSelectItem(id);
		setCurrentComponent(style);
		setComponents([...components, style]);
	};

	const sendEmail = async (to, subject, body) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/students/sendEmail",
				{
					to: to,
					subject: subject,
					body: body,
				}
			);

			console.log("Response:", response.data); // Log the response from the server
		} catch (error) {
			console.error("Error:", error.response.data); // Handle errors
		}
	};

	const registerStudent = async (name, email, password) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/students/register",
				{
					studentName: name,
					mail: email,
					password: password,
				}
			);

			console.log("Response:", response.data); // Log the response from the server
		} catch (error) {
			console.error("Error:", error.response.data); // Handle errors
		}
	};

	const createAndDownloadCertificates = async (excelData) => {
		console.log(excelData);
		const certificateList = [];
		const title = templateTitle;
		const description = "dummy";
		const date = Date.now();
		const issuer = localStorage.getItem("instituteName");

		try {
			const allmails = await axios.get(
				"http://localhost:8000/api/students/getallmails"
			);
			const mailsArray = allmails.data.map((item) => item.mail);
			console.log(mailsArray);
			for (let index = 0; index < excelData.length; index++) {
				const data = excelData[index];
				const updatedComponents = components.map((component) => {
					if (component.name === "placeholder") {
						const columnValue = data[component.title] || "";
						return {
							...component,
							title: columnValue,
						};
					}
					return component;
				});
				const certificateDiv = (
					<div className="m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden">
						<div
							id="hidden_certificate"
							className="w-auto relative h-auto overflow-hidden select-none"
						>
							{updatedComponents.map((c, i) => (
								<FixedComponents
									key={i}
									info={c}
									current_component={current_component}
									removeComponent={removeComponent}
								/>
							))}
						</div>
					</div>
				);
				const getDiv = document.createElement("div");
				ReactDOM.render(certificateDiv, getDiv);

				// Add a delay to ensure the content is fully rendered
				await new Promise((resolve) => setTimeout(resolve, 500));

				// console.log(getDiv);
				// Add the div to the document body temporarily
				document.body.appendChild(getDiv);
				const getDiv2 = document.getElementById("hidden_certificate");
				console.log(getDiv2);
				const dataUrl = await htmlToImage.toJpeg(getDiv2, {
					style: {
						transform: "scale(1)",
					},
				});
				// console.log(dataUrl);
				const fileInput = dataUrl.split(",")[1];

				// const username = excelData[index].Mail.match(/^([^@]*)@/)[1]; // Extract username from email
				const studname = excelData[index].Student_Name;
				const certificateName = `${templateTitle}_${studname}`; // Concatenate username and templateTitle with an underscore
				// console.log(certificateName); // This will log the certificateName

				if (!mailsArray.includes(excelData[index].Mail)) {
					sendEmail(
						excelData[index].Mail,
						"Your Account has been created.",
						"Your password for accessing your certificates is: 2503"
					);
					registerStudent(
						excelData[index].Student_Name,
						excelData[index].Mail,
						"2503"
					);
					mailsArray.push(excelData[index].Mail);
				}

				const certificateObj = {
					fileInput: fileInput,
					emailId: `${excelData[index].Mail}`,
					certificateName: certificateName,
					collegeName: localStorage.getItem("instituteName"),
				};

				console.log(certificateObj);

				certificateList.push(certificateObj);
				// console.log(certificateList);

				// Download Functionality:
				// var link = document.createElement("a");
				// link.download = excelData[index].Mail.match(/^([^@]*)@/)[1];
				// link.href = dataUrl;
				// document.body.appendChild(link);
				// link.click();
				// document.body.removeChild(link);
				// Remove the div from the document body

				document.body.removeChild(getDiv);
			}
			//   console.log(certificateList);
			const startTime = Date.now();
			const iterations = Math.ceil(certificateList.length / 2);
			for (let i = 0; i < iterations; i++) {
				const startIndex = i * 2;
				const endIndex = Math.min(
					startIndex + 2,
					certificateList.length
				);
				const certificatesToSend = certificateList.slice(
					startIndex,
					endIndex
				);

				const formData = new FormData();
				formData.append("title", title);
				formData.append("description", description);
				formData.append("date", date);
				formData.append("issuer", issuer);
				formData.append("list", JSON.stringify(certificatesToSend));

				console.log(formData);
				const response = await fetch(
					"http://localhost:4000/api/certificate/addfile",
					{
						method: "POST",
						body: formData,
					}
				);
				console.log(response);
				if (response.ok) {
					const result = await response.json();
					// if (result.success) {
					//   alert("File uploaded successfully!");
					// } else {
					//   alert("Failed to upload file. Error: " + result.success);
					// }
				} else {
					alert("Failed to upload file. Status: " + response.status);
				}
			}
			const endTime = Date.now(); // Log the end time
			const totalTime = endTime - startTime - 6000 * iterations; // Calculate the total time taken
			console.log("Total time taken:", totalTime, "milliseconds");
		} catch (error) {
			console.error("Error capturing certificates:", error);
		}
	};

	const processDataFromExcel = (data) => {
		const workbook = XLSX.read(data, { type: "binary" });
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];
		const excelData = XLSX.utils.sheet_to_json(sheet);
		createAndDownloadCertificates(excelData);
	};

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = e.target.result;
				processDataFromExcel(data);
			};
			reader.readAsBinaryString(file);
		}
	};

	useEffect(() => {
		if (current_component) {
			const index = components.findIndex(
				(c) => c.id === current_component.id
			);
			const temp = components.filter(
				(c) => c.id !== current_component.id
			);
			console.log(current_component);
			if (current_component.name === "placeholder") {
				components[index].fontSize =
					fontSize || current_component.fontSize;
				components[index].fontStyle =
					fontStyle || current_component.fontStyle;
				components[index].italic = current_component.italic;
				components[index].underline = current_component.underline;
				components[index].padding =
					padding || current_component.padding;
				components[index].weight = weight || current_component.weight;
				components[index].title =
					placeholder || current_component.title;
			}

			components[index].color = color || current_component.color;

			if (current_component.name !== "main_frame") {
				components[index].left = left || current_component.left;
				components[index].top = top || current_component.top;
				components[index].opacity =
					opacity || current_component.opacity;
				components[index].z_index = zIndex || current_component.z_index;
			}
			setComponents([...components]);
			setColor("");
			setWidth("");
			setHeight("");
			setTop("");
			setLeft("");
			setRotate(0);
			setOpacity("");
			setzIndex("");
			setPlaceholder("");
			setPadding("");
			setFontSize("");
			setWeight("");
			setFontStyle("");
		}
	}, [
		color,
		left,
		top,
		width,
		height,
		opacity,
		zIndex,
		padding,
		fontSize,
		fontStyle,
		weight,
		placeholder,
		rotate,
		current_component.italic,
		current_component.underline,
	]);

	useEffect(() => {
		const get_design = async () => {
			try {
				const { data } = await api.get(
					`/api/designs/user-design/${design_id}`
				);
				// console.log(data);
				const { design } = data;
				setTemplateTitle(design[0].templateTitle);

				for (let i = 0; i < design.length; i++) {
					design[i].setCurrentComponent = (a) =>
						setCurrentComponent(a);
					design[i].moveElement = moveElement;
					design[i].resizeElement = resizeElement;
					design[i].rotateElement = rotateElement;
					//   design[i].remove_background = remove_background;
				}
				setComponents(design);
			} catch (error) {
				console.log(error);
			}
		};
		get_design();
	}, [design_id]);

	return (
		<div className="min-w-screen h-screen bg-white">
			<Header
				components={components}
				templateTitle={templateTitle}
				design_id={design_id}
			/>
			<div className="flex h-[calc(100%-60px)] w-screen">
				<div className="h-full w-[calc(100%)]">
					<div className="w-full flex h-full">
						<div
							className={`flex justify-center relative items-center h-full bg-black ${
								!current_component
									? "w-full"
									: "w-[calc(100%-250px)] overflow-hidden"
							}`}
						>
							<div className="m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden">
								<div
									id="main_design"
									className="w-auto relative h-auto overflow-hidden select-none"
								>
									{components.map((c, i) => (
										<FixedComponents
											selectItem={selectItem}
											setSelectItem={setSelectItem}
											key={i}
											info={c}
											current_component={
												current_component
											}
											removeComponent={removeComponent}
										/>
									))}
								</div>
							</div>
						</div>

						{current_component && (
							<div className="h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2">
								<div className="flex gap-12 flex-col items-start h-full px-3 justify-start pt-4">
									{current_component.name ===
										"main_frame" && (
										<>
											<div
												onClick={() =>
													add_placeholder(
														"placeholder",
														"title"
													)
												}
												className="w-full h-[40px] flex justify-center items-center bg-purple-600 rounded-sm text-white mb-3 cursor-pointer"
											>
												<h2>Add Placeholder</h2>
											</div>
											<label
												htmlFor="file-upload"
												className="w-full h-[40px] flex justify-center items-center bg-purple-600 rounded-sm text-white cursor-pointer"
											>
												Upload Excel File
												<input
													id="file-upload"
													type="file"
													accept=".xlsx, .xls"
													onChange={handleFileUpload}
													className="hidden"
												/>
											</label>
										</>
									)}
									{current_component.name !==
										"main_frame" && (
										<>
											<div className="flex justify-start items-center gap-5">
												<div
													onClick={() =>
														removeComponent(
															current_component?.id
														)
													}
													className="w-[30px] flex justify-center items-center rounded-md cursor-pointer h-[30px] bg-slate-700 hover:bg-slate-800"
												>
													<FaTrash />
												</div>
												<div
													onClick={() =>
														duplicate(
															current_component
														)
													}
													className="w-[30px] flex justify-center items-center rounded-md cursor-pointer h-[30px] bg-slate-700 hover:bg-slate-800"
												>
													<IoDuplicateOutline />
												</div>
											</div>
											<div className="flex gap-4 justify-start items-start">
												<span>Color : </span>
												<label
													className="w-[30px] h-[30px] cursor-pointer rounded-sm"
													style={{
														background: `${
															current_component.color &&
															current_component.color !==
																"#fff"
																? current_component.color
																: "gray"
														}`,
													}}
													htmlFor="color"
												></label>
												<input
													onChange={(e) =>
														setColor(e.target.value)
													}
													type="color"
													className="invisible"
													id="color"
												/>
											</div>
											<div className="flex gap-6 flex-col">
												<div className="flex gap-1 justify-start items-start">
													<span className="text-md w-[70px]">
														Opacity :{" "}
													</span>
													<input
														onChange={opacityHandle}
														className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
														type="number"
														step={0.1}
														min={0.1}
														max={1}
														value={
															current_component.opacity
														}
													/>
												</div>
												<div className="flex gap-1 justify-start items-start">
													<span className="text-md w-[70px]">
														Z-Index :{" "}
													</span>
													<input
														onChange={(e) =>
															setzIndex(
																parseInt(
																	e.target
																		.value
																)
															)
														}
														className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
														type="number"
														step={1}
														value={
															current_component.z_index
														}
													/>
												</div>
												{current_component.name ===
													"placeholder" && (
													<>
														<div className="flex gap-1 justify-start items-start">
															<span className="text-md w-[70px]">
																Padding :{" "}
															</span>
															<input
																onChange={(e) =>
																	setPadding(
																		parseInt(
																			e
																				.target
																				.value
																		)
																	)
																}
																className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
																type="number"
																step={1}
																value={
																	current_component.padding
																}
															/>
														</div>
														<div className="flex gap-1 justify-start items-start">
															<span className="text-md w-[72px]">
																Font style :{" "}
															</span>
															<select
																onChange={(e) =>
																	setFontStyle(
																		e.target
																			.value
																	)
																}
																className="border border-gray-700 bg-transparent outline-none px-2 rounded-md"
																value={
																	current_component.fontStyle
																}
															>
																<option value="Arial">
																	Arial
																</option>
																<option value="Verdana">
																	Verdana
																</option>
																<option value="Helvetica">
																	Helvetica
																</option>
																<option value="Times New Roman">
																	Times New
																	Roman
																</option>
																<option value="Georgia">
																	Georgia
																</option>
																<option value="Courier New">
																	Courier New
																</option>
																<option value="Tahoma">
																	Tahoma
																</option>
																<option value="Geneva">
																	Geneva
																</option>
																<option value="Palatino">
																	Palatino
																</option>
																<option value="Comic Sans MS">
																	Comic Sans
																	MS
																</option>
																<option value="Impact">
																	Impact
																</option>
																<option value="Trebuchet MS">
																	Trebuchet MS
																</option>
																<option value="Arial Black">
																	Arial Black
																</option>
																<option value="Rockwell">
																	Rockwell
																</option>
															</select>
														</div>
														<div className="flex gap-1 justify-start items-start">
															<span className="text-md w-[72px]">
																Font size :{" "}
															</span>
															<input
																onChange={(e) =>
																	setFontSize(
																		parseInt(
																			e
																				.target
																				.value
																		)
																	)
																}
																className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
																type="number"
																step={1}
																value={
																	current_component.fontSize
																}
															/>
														</div>
														<div className="flex gap-1 justify-start items-start">
															<span className="text-md w-[70px]">
																Weight :{" "}
															</span>
															<input
																onChange={(e) =>
																	setWeight(
																		parseInt(
																			e
																				.target
																				.value
																		)
																	)
																}
																className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
																type="number"
																step={100}
																min={100}
																max={900}
																value={
																	current_component.weight
																}
															/>
														</div>
														<div className="flex gap-1 justify-start items-start">
															<input
																type="checkbox"
																onChange={(
																	e
																) => {
																	setCurrentComponent(
																		(
																			prevState
																		) => ({
																			...current_component,
																			italic: !prevState.italic,
																		})
																	);
																}}
																checked={
																	current_component.italic
																}
																id="italic-checkbox"
															/>
															<label htmlFor="italic-checkbox">
																Italic
															</label>
														</div>
														<div className="flex gap-1 justify-start items-start">
															<input
																type="checkbox"
																onChange={(
																	e
																) => {
																	setCurrentComponent(
																		(
																			prevState
																		) => ({
																			...current_component,
																			underline:
																				!prevState.underline,
																		})
																	);
																}}
																checked={
																	current_component.underline
																}
																id="underline-checkbox"
															/>
															<label htmlFor="underline-checkbox">
																Underline
															</label>
														</div>

														<div className="flex gap-2 flex-col justify-start items-start">
															<input
																onChange={(e) =>
																	setCurrentComponent(
																		{
																			...current_component,
																			title: e
																				.target
																				.value,
																		}
																	)
																}
																className="border border-gray-700 bg-transparent outline-none p-2 rounded-md"
																type="text"
																value={
																	current_component.title
																}
															/>
															<button
																onClick={() =>
																	setPlaceholder(
																		current_component.title
																	)
																}
																className="px-4 py-2 bg-purple-500 text-xs text-white rounded-sm"
															>
																Add
															</button>
														</div>
													</>
												)}
											</div>
										</>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceholderPage;
