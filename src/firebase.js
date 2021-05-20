import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

  var firebaseConfig = {
    apiKey: "AIzaSyBGk7jYrWzrDBLfhqwXnYczqCjHjoY_g0k",
    authDomain: "fitnesstracker-6afd6.firebaseapp.com",
    databaseURL: "https://fitnesstracker-6afd6.firebaseio.com",
    projectId: "fitnesstracker-6afd6",
    storageBucket: "fitnesstracker-6afd6.appspot.com",
    messagingSenderId: "265517822323",
    appId: "1:265517822323:web:ddbba9f32b4db6598d5506"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
   
export default firebase;