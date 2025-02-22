import React, { useState } from 'react';
import { auth, provider, signInWithPopup } from '../utils/firebase';

const GoogleSignIn = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setError(null);
    } catch (error) {
      setError(error.message);
      setUser(null);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}!</h2>
          <img src={user.photoURL} alt={user.displayName} />
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default GoogleSignIn;