import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCE1kQFvI0xdAz0EWbVzoJX-Grxb-5R31g",
  authDomain: "instagram-clone-fbf59.firebaseapp.com",
  projectId: "instagram-clone-fbf59",
  storageBucket: "instagram-clone-fbf59.appspot.com",
  messagingSenderId: "343096071990",
  appId: "1:343096071990:web:4b8c4643e33b6c2de98597",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
