import Airline from "./airline";
import InputBar from "./inputBar";

const Home = () => {
  return (
    <div>
        <h1>Better Airlines</h1>
        <img className="logo" src="src\assets\logo.png" alt="Better Airlines Logo" />
        <InputBar/>
        <Airline/>
    </div>
  );
};

export default Home;