import Airlines from "./airlines";
import InputBar from "./inputBar";

const Home = () => {
  return (
    <div>
        <h1>Better Airlines</h1>
        <img className="logo" src="src\assets\logo.png" alt="Better Airlines Logo" />
        <InputBar/>
        <Airlines/>
    </div>
  );
};

export default Home;