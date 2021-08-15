import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import Todos from './todos';
import Users from './users';


class App extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  
  render() {
    return (
      <Router>
        {/* <Switch> */}
          <Menu />
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/todos">
            <Todos />
          </Route>
        {/* </Switch> */}
      </Router>
    );
  }
}

export default App;
