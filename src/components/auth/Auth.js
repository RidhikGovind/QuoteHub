import React, { useEffect } from "react";
import SignIn from "./SignIn";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";

function Auth() {
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) history.push("/main");
    });
  }, []);
  return (
    <div className="auth-container">
      <div className="auth-title">QuotesHub</div>
      <div className="click">
        <SignIn />
      </div>
    </div>
  );
}

export default Auth;

