import React, { useState, useEffect } from "react";
import { db } from "../../firebase";


const ref = db.collection("quoteList");

function useQuoteList() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    ref.onSnapshot((snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLists(list);
    });
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
