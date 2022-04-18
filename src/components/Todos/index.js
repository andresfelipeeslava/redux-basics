import React from "react";
import { connect } from "react-redux";
import * as todosActions from "../../actions/components/todosActions";

class Todos extends React.Component {
  componentDidMount() {
    if (!this.props.todos.lenght) {
      this.props.getTodos();
    }
  }

  render() {
    console.log("this.props>>>>>>>>>>>><", this.props);
    return <div className="todos margin-2rem">Todos here!</div>;
  }
}

const mapStateTopProps = ({ todosReducer }) => todosReducer;

export default connect(mapStateTopProps, todosActions)(Todos);
