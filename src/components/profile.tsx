import { useAuth } from "../utils/authcontext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (!user) {
    navigate("/");
    return null;
  }

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img style={{ cursor: 'pointer' }} onClick={() => navigate("/")} src="/src/assets/logo.png" alt="Better Airlines Logo"/>
      <h1 className="text-3xl font-bold">Profile</h1>
      <img
        className="rounded-full w-24 h-24"
        src={user?.photoURL || "/default-profile.png"}
        alt={user?.displayName || "User"}
      />
      <p className="text-xl">{user?.displayName}</p>
      <p className="text-gray-500">{user?.email}</p>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        onClick={handleSignOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
