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

  componentDidUpdate() {
    const { getTodos, loading, todos } = this.props;
    if (!Object.keys(todos).length && !loading) {
      getTodos();
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
    const { todos, markCheckbox, deleteTodo } = this.props;
    const todoByUser = {
      ...todos[userId],
    };

    return Object.keys(todoByUser).map((todoId) => (
      <div className="" key={`${todoByUser[todoId].userId}_${todoId}`}>
        <input
          type="checkbox"
          defaultChecked={todoByUser[todoId].completed}
          onChange={() => markCheckbox(userId, todoId)}
        />
        <span>{todoByUser[todoId].title}</span>
        <Link to={`/todos/save/${userId}/${todoId}`}>
          <button className="m-xs">Editar</button>
        </Link>
        <button className="m-xs" onClick={() => deleteTodo(todoId)}>
          Eliminar
        </button>
      </div>
    ));
  };

  render() {
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
