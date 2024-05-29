// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore ,collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_LhiQSkLk6_HIUmRog_8tND5D_bVyPJc",
  authDomain: "react-notes-c04ab.firebaseapp.com",
  projectId: "react-notes-c04ab",
  storageBucket: "react-notes-c04ab.appspot.com",
  messagingSenderId: "1050317334880",
  appId: "1:1050317334880:web:6780e90b3465d60a80d605"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)  //db is now an instance of Firestore connected to your Firebase project. This object allows you to interact with the Firestore database, such as reading from , writing to and deleting from it.
const auth = getAuth(app)
const notesCollection = collection(db,"notes")   // reference to my collection in firstore data base

export {db};
export {notesCollection};
export {auth};