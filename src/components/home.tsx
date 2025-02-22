import Airlines from "./airlines";
import InputBar from "./inputBar";
import GoogleSignIn from "./googlesignin";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // navigate('/profile');
  };

  return (
    <div>
        <GoogleSignIn/>
        <h1>Better Airlines</h1>
        <img onClick={handleRedirect} className="logo" src="src\assets\logo.png" alt="Better Airlines Logo" />
        <InputBar/>
        <Airlines/>
    </div>
  );
};

export default Home;