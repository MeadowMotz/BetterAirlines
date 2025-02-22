import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/home";
// import Profile from "./components/ai/profile";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
 {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  </Router>
  )
}

export default App
