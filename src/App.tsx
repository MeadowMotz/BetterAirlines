import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Airlines from "./components/airlines";
// import Profile from "./components/ai/profile";

function App() {

  return (
    <Router>
    <Routes> 
     <Route path="/" element={<Home />} />
     <Route path="/airlines" element={<Airlines />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  </Router>
  )
}

export default App
