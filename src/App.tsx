import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Testing from "./components/testing";
import Profile from "./components/profile";
// import Results from "./components/Results"; // Import Results component
import { AuthProvider } from "./utils/authcontext";


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
