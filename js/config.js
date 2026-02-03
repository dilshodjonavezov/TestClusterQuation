// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDd_MD5YtOFryFqEF8i7ounM4lg1KNg1pQ",
    authDomain: "test-cluster-survey.firebaseapp.com",
    projectId: "test-cluster-survey",
    storageBucket: "test-cluster-survey.firebasestorage.app",
    messagingSenderId: "849799588580",
    appId: "1:849799588580:web:9a06ea6fb7a79fac201af1",
    measurementId: "G-NYGNMDS5EX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);