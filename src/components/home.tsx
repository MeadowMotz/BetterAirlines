import Airlines from "./airlines";
import InputBar from "./inputBar";
import GoogleSignIn from "./googlesignin";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  const style = {
    backgroundColor: "#f0f0f0", // Change this to your desired color
    height: "100vh", // Ensure the background color covers the entire viewport
  };

  return (
    <div style={style}>
      <GoogleSignIn />
      <h1>Better Airlines</h1>
      <img
        onClick={handleRedirect}
        className="logo"
        src="src\assets\logo.png"
        style={{ cursor: "pointer" }}
        alt="Better Airlines Logo"
      />
      <InputBar />
    </div>
  );
};

export default Home;
