import React, { useEffect } from 'react';
import logo from './logo.gif';
import './App.css';
import Form from './components/Form';
import firebase from './firebase';
import auth from './firebase';

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();
  useEffect(()=>{
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    },[]);
  })

  
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Gym Tracker
        </h1>
        <p>Because the human memory is unreliable !</p>
        
      </header>
      <Form />
    </div>
  );
}

export default App;
