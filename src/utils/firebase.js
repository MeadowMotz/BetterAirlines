import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDw0S5Lp_2jbDNkVDaPcBiM4FGRnxpU4pg",
    authDomain: "better-airlines.firebaseapp.com",
    projectId: "better-airlines",
    storageBucket: "better-airlines.firebasestorage.app",
    messagingSenderId: "170848637644",
    appId: "1:170848637644:web:3ff876fb9ecfaed0042869",
    measurementId: "G-PZTRCK1ZJ1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };