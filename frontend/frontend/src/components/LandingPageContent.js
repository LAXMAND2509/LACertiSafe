import "./LandingPageContent.css";
import landingPageImage from "../assets/LandingPageImage.png";

const LandingPageContent = () => {
  return (
    <div className="body-content">
      <div className="text-content">
        <h2>Introducing</h2>
        <h1>LACertiSafe</h1>
        <h3>
          A secure platform for institutes to create and share customized
          certificates with students, while enabling easy verification by
          recruiters and other institutions.
        </h3>
      </div>
      <img
        src={landingPageImage}
        alt="landingPageImage"
        className="landing-image"
      />
    </div>
  );
};

export default LandingPageContent;
