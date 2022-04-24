import React from "react";
import { connect } from "react-redux";
import * as todosActions from "../../actions/components/todosActions";
import { Spinner } from "../Spinner";
import { Fatal } from "../Fatal";

class Todos extends React.Component {
  componentDidMount() {
    if (!this.props.todos.lenght) {
      this.props.getTodos();
    }
  }

  showContent = () => {
    const { todos, loading, error } = this.props;

    if (loading) return <Spinner />;
    if (error) return <Fatal message={error} />;

    return Object.keys(todos).map((userId) => (
      <div key={userId}>
        <h2>Usuario {userId}</h2>
        <div>{this.setTodos(userId)}</div>
      </div>
    ));
  };

  setTodos = (userId) => {
    const { todos } = this.props;
    const todoByUser = {
      ...todos[userId],
    };

    return Object.keys(todoByUser).map((todoId) => (
      <div key={`${todoByUser}_${todoId}`}>
        <input type="checkbox" defaultChecked={todoByUser[todoId].completed} />
        <span>{todoByUser[todoId].title}</span>
      </div>
    ));
  };

  render() {
    console.log("this.props>>>>>>>>>>>><", this.props);
    return <div className="todos margin-2rem">{this.showContent()}</div>;
  }
}

const mapStateToProps = ({ todosReducer }) => todosReducer;

export default connect(mapStateToProps, todosActions)(Todos);
