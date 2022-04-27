import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as todosActions from "../../actions/components/todosActions";
import { Spinner } from "../Spinner";
import { Fatal } from "../Fatal";
import { Redirect } from "react-router-dom";

export class SaveTodo extends React.Component {
  setUserId = (event) => this.props.setUserId(event.target.value);
  setTitle = (event) => this.props.setTitle(event.target.value);

  componentDidMount() {
    const {
      cleanUp,
      match: {
        params: { userId, todoId },
      },
      todos,
      setTitle,
      setUserId,
    } = this.props;

    if (userId && todoId) {
      const todo = todos[userId][todoId];
      setUserId(todo.userId);
      setTitle(todo.title);
    } else {
      cleanUp();
    }
  }

  disableButton = () => {
    const { userId, title, isLoading } = this.props;
    if (isLoading) return true;
    if (!userId || !title) return true;

    return false;
  };

  saveTodo = () => {
    const {
      addTodo,
      editTodo,
      match: {
        params: { userId, todoId },
      },
      todos,
      title,
      userId: userID,
    } = this.props;

    const newTodo = {
      completed: false,
      title: title,
      userId: userID,
    };

    if (userId && todoId) {
      const todo = todos[userId][todoId];
      const editedTodo = {
        ...newTodo,
        completed: todo.completed,
        id: todo.id,
      };
      editTodo(editedTodo);
    } else {
      addTodo(newTodo);
    }
  };

  showValidation = () => {
    const { isLoading, error } = this.props;
    if (isLoading) return <Spinner />;
    if (error) return <Fatal message={error} />;
  };

  render() {
    return (
      <div className="m-m">
        {this.props.isRedirecting ? <Redirect to="/todos" /> : ""}
        <h1>Guardar Todo</h1>
        <label htmlFor="todo_id">Usuario ID: </label>
        <input
          id="todo_id"
          onChange={this.setUserId}
          type="number"
          value={this.props.userId}
        />
        <br />
        <br />
        <label htmlFor="todo_title">Título: </label>
        <input
          id="todo_title"
          onChange={this.setTitle}
          type="text"
          value={this.props.title}
        />
        <br />
        <br />
        <button onClick={this.saveTodo} disabled={this.disableButton()}>
          Guardar Todo
        </button>

        {this.showValidation()}
      </div>
    );
  }
}

const mapStateToProps = ({ todosReducer }) => todosReducer;

export default connect(mapStateToProps, todosActions)(withRouter(SaveTodo));
