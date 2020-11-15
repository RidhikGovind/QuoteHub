import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { LightningBoltIcon } from "@modulz/radix-icons";
import PingNum from "./PingNum";

const ref = db.collection("quoteList");
let userName;

function useQuoteList() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        ref.onSnapshot((snap) => {
          userName = user.displayName;
          const list = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLists(list);
        });
      }
    });
  }, []);

  return lists;
}

function QuoteList() {
  const [pings, setPings] = useState(0);
  const [pingIndex, setPingIndex] = useState("");
  const listItems = useQuoteList();

  const handleOnDelete = (id) => {
    ref.doc(id).delete();
  };

  const pingIncrement = (id) => {
    setPingIndex(id);
    console.log(pingIndex);
    setPings(pings + 1);
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
            <div
              className="ping"
              data-id={list.id}
              onClick={(e) => pingIncrement(list.id)}
            >
              <LightningBoltIcon />
              <span>{pingIndex === list.id && <PingNum pings={pings} />}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default QuoteList;
