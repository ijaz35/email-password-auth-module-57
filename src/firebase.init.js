// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJF9xPIgnKYHRA5qiaoXjd2augpyzboyY",
    authDomain: "email-password-auth-cb191.firebaseapp.com",
    projectId: "email-password-auth-cb191",
    storageBucket: "email-password-auth-cb191.appspot.com",
    messagingSenderId: "204201752281",
    appId: "1:204201752281:web:b360d9900a4f197d3870c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;