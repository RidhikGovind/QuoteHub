// import React, { useState } from "react";
import React from "react";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

function SignIn() {
  const history = useHistory();

  const provider = new firebase.auth.GoogleAuthProvider();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(() => {
        //if successful then route is forwarded to 'main.js'
        history.push("/main");
        console.log("logged in");
      })
      .catch((err) => console.log("error in loggin in"));
  };

  return (
    <div className="signin-container">
      <div onClick={signIn} className="signinBtn">
        &gt;
      </div>
    </div>
  );
}

export default SignIn;
