import React, { useState } from "react";
import { db } from "../../firebase";
import firebase from 'firebase'
import { auth } from "../../firebase";


function AddQuote() {
  const [quote, setQuote] = useState("");
  const [tags, setTags] = useState("");

  const ref = db.collection("quoteList");


  const onSubmit = (e) => {
    e.preventDefault();

    auth.onAuthStateChanged((user) =>{
      if(user) {
        const { serverTimestamp } = firebase.firestore.FieldValue;
        ref
          .add({
            uid: user.uid,
            quote,
            tags,
            createdAt: serverTimestamp(),
          })
          .then(() => {
            console.log("note entered into db");
            setQuote(" ");
            setTags(" ");
          })
          .catch((err) => console.log("oops quote not entered", err));
      }
    })
    
  };

  return (
    <div className="addQuote-container">
      <form onSubmit={onSubmit}>
        <div className="input-container">
        <label htmlFor="quote" style={{color: 'black'}}>Your Favourite Quote</label>
        <input
          type="text"
          name="quote"
          placeholder="e.g Don't find fault, find a remedy."
          value={quote}
          onChange={(e) => setQuote(e.currentTarget.value)}
          required
          className
        />
        <label htmlFor="tags" style={{color: 'black'}}>Tags</label>
        <input
          type="text"
          placeholder="#inspiring, #motivation"
          value={tags}
          onChange={(e) => setTags( e.currentTarget.value)}
          required
        />
        <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default AddQuote;
