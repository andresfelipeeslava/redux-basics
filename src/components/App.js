import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import Publications from "./Publications";
import Todos from "./Todos";
import SaveTodo from "./Todos/SaveTodo";
import Users from "./Users";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Menu />
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/todos">
          <Todos />
        </Route>
        <Route exact path="/publications/:key">
          <Publications />
        </Route>
        <Route exact path="/todos/save">
          <SaveTodo />
        </Route>
      </Router>
    );
  }
}

export default App;
