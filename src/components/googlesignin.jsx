import { auth, provider, signInWithPopup } from "../utils/firebase";
import { useAuth } from "../utils/authcontext";

const GoogleSignIn = () => {
  const { user, loading } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {!user ? (
        <button onClick={handleGoogleSignIn} className="px-4 py-2 bg-blue-600 text-white rounded-lg top-right-button">
          Sign in with Google
        </button>
      ) : null}
    </div>
  );
};

export default GoogleSignIn;
