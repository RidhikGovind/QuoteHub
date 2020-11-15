import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { auth } from "../../firebase";


const ref = db.collection("quoteList");
let userName;
function useQuoteList() {
  const [lists, setLists] = useState([]);

  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      if (user) {
        ref
        
        .onSnapshot((snap) => {
          userName = user.displayName;
          const list = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLists(list);
        });

       }})
    
  }, []);

  return lists;
}

const QuoteList = () => {
  const listItems = useQuoteList();

  const handleOnDelete = (id) => {
    ref.doc(id).delete();
  };

  return (
    <div className="quoteList-container">
      {listItems.map((list) => {
        return (
          <div className="quoteList">
            <div className="userName">{userName}</div>
            <div className="quote">{list.quote}</div>
            <div className="tags">{list.tags}</div>
            <div className="delBtn" onClick={() => handleOnDelete(list.id)}>
              X
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuoteList;
