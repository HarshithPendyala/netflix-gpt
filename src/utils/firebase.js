// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: "netflix-gpt-ace4f.firebaseapp.com",
	projectId: "netflix-gpt-ace4f",
	storageBucket: "netflix-gpt-ace4f.appspot.com",
	messagingSenderId: "132893945862",
	appId: "1:132893945862:web:af87addeb03dc1c039d387",
	measurementId: "G-VJYXZXTEZR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
