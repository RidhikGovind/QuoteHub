import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Main from "./components/main/Main";
import Auth from "./components/auth/Auth";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/Main" component={Main} />
          <Redirect to="/auth" from="*" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
