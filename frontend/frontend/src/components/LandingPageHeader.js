import "./LandingPageHeader.css";
import "./button.css";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";

const LandingPageHeader = () => {
	const navigate = useNavigate();

	function clickInstituteHandler() {
		navigate("/institutelogin");
	}

	function clickStudentHandler() {
		navigate("/studentlogin");
	}

	function clickVerifierHandler() {
		navigate("/verifierHome");
	}
	return (
		<div className={"header"}>
			<img src={logo} alt="LACertiSafe Logo" className="logo-image" />
			<div className={"button-container"}>
				<button className={"button"} onClick={clickInstituteHandler}>
					Institute
				</button>
				<button className={"button"} onClick={clickStudentHandler}>
					Student
				</button>
				<button className={"button"} onClick={clickVerifierHandler}>
					Verification
				</button>
			</div>
		</div>
	);
};

export default LandingPageHeader;
