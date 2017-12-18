import React from "react";
import Popular from "./Popular";
import Nav from "./Nav";
import Results from "./Results";
import Home from "./Home";
import Battle from "./Battle";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/popular" component={Popular} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route
              render={() => {
                return <h1>Not found!!</h1>;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
