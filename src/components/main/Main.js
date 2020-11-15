import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import AddQuote from "./AddQuote";
import QuoteList from "./QuoteList";
import { Pencil2Icon } from "@modulz/radix-icons";

function Main() {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) history.push("/auth");
    });
  });

  const history = useHistory();

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        history.push("/auth");
        console.log("logged out successfully");
      })
      .catch(() => console.log("error logging out"));
  };

  return (
    <div className="main-container">
      <div className="header">
        <h2>
          QuoteHub
          <span>
            <Pencil2Icon />
          </span>
        </h2>
        <div onClick={logOut} className="logOutIcon">
          LogOut
        </div>
      </div>
      <AddQuote />
      <QuoteList />
    </div>
  );
}

export default Main;
