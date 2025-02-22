import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup } from '../utils/firebase';

const GoogleSignIn = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleProfileClick = () => {
      navigate('/profile');
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h3>Welcome, {user.displayName}!</h3>
          <img src={user.photoURL} alt={user.displayName} onClick={handleProfileClick} style={{ cursor: 'pointer' }} />
        </div>
      ) : (
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default GoogleSignIn;