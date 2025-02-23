import Airlines from "./airlines";
import InputBar from "./inputBar";
import GoogleSignIn from "./googlesignin";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuth } from "../utils/authcontext";

const Home = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200">
      <h1 className="text-xl font-bold">Better Airlines</h1>
      <img onClick={() => navigate("/")} src="/src/assets/logo.png" alt="Better Airlines Logo"/>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL || "/default-profile.png"}
            style={{ width: '50px', height: '50px' }}
            alt={user.displayName || "User"}
            className="w-10 h-10 rounded-full cursor-pointer top-right-pic"
            onClick={() => navigate("/profile")}
          />
          <button onClick={handleSignOut} className="px-4 py-2 bg-red-500 text-white rounded-lg top-right-button">
            Logout
          </button>
        </div>
      ) : (
        <GoogleSignIn />
      )}

      <InputBar />
      <Airlines />
    </div>
  );
};

export default Home;
