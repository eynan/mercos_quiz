import React from 'react';
import Container from "./componentes/Container";
import firebase from 'firebase';

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBEOMl444aXCLPiBvP1rHuNjyZq_5Wt6QU",
    authDomain: "mercosquiz.firebaseapp.com",
    databaseURL: "https://mercosquiz.firebaseio.com",
    projectId: "mercosquiz",
    storageBucket: "mercosquiz.appspot.com",
    messagingSenderId: "711106634651",
    appId: "1:711106634651:web:fa67c2813b78bf39"
  }
  firebase.initializeApp(firebaseConfig)
  firebase.database.enableLogging(true);

  return (
      <Container db={firebase}/>
  );
}

export default App;
