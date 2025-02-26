import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
provider.setCustomParameters({ prompt: 'select_account' });

export function login() {
    signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
    signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}