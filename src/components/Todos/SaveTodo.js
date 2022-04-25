import React from "react";
import { connect } from "react-redux";
import * as todosActions from "../../actions/components/todosActions";
import { Spinner } from "../Spinner";
import { Fatal } from "../Fatal";

export class SaveTodo extends React.Component {
  setUserId = (event) => this.props.setUserId(event.target.value);
  setTitle = (event) => this.props.setTitle(event.target.value);

  disableButton = () => {
    const { userId, title, isLoading } = this.props;
    if (isLoading) return true;
    if (!userId || !title) return true;

    return false;
  };

  saveTodo = () => {
    const { userId, title, addTodo } = this.props;
    const newTodo = {
      userId: userId,
      title: title,
      completed: false,
    };
    addTodo(newTodo);
  };

  showAction = () => {
    const { isLoading, error } = this.props;
    if (isLoading) return <Spinner />;
    if (error) return <Fatal message={error} />;
  };

  render() {
    return (
      <div className="margin-2rem">
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

        {this.showAction()}
      </div>
    );
  }
}

const mapStateToProps = ({ todosReducer }) => todosReducer;

export default connect(mapStateToProps, todosActions)(SaveTodo);
