import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as todosActions from "../../actions/components/todosActions";
import { Spinner } from "../Spinner";
import { Fatal } from "../Fatal";

class Todos extends React.Component {
  componentDidMount() {
    if (!Object.keys(this.props.todos).length) {
      this.props.getTodos();
    }
  }

  showContent = () => {
    const { todos, isLoading, error } = this.props;

    if (isLoading) return <Spinner />;
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

    return Object.keys(todoByUser).map((userTodoId) => (
      <div className="" key={`${todoByUser[userTodoId].userId}_${userTodoId}`}>
        <input
          type="checkbox"
          defaultChecked={todoByUser[userTodoId].completed}
        />
        <span>{todoByUser[userTodoId].title}</span>
        <button className="m-xs">editar</button>
        <button className="m-xs">eliminar</button>
      </div>
    ));
  };

  render() {
    console.log("this.props index", this.props);
    return (
      <div className="todos m-m">
        <Link to="/todos/save">
          <button>Guardar nuevo todo</button>
        </Link>
        {this.showContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ todosReducer }) => todosReducer;

export default connect(mapStateToProps, todosActions)(Todos);
