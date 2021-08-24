import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import Todos from './Todos';
import Users from './Users';

class App extends React.Component {
  constructor() {
    super();
    this.state = {}
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
      </Router>
    );
  }
}

export default App;