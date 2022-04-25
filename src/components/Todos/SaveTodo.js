import React from "react";
import { connect } from "react-redux";
import * as todosActions from "../../actions/components/todosActions";

export class SaveTodo extends React.Component {
  setUserId = (event) => {
    console.log(event.target.value);
    this.props.setUserId(event.target.value);
  };
  setTitle = (event) => {
    console.log(event.target.value);
    this.props.setTitle(event.target.value);
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
        <button>Guardar Todo</button>
      </div>
    );
  }
}

const mapStateToProps = ({ todosReducer }) => todosReducer;

export default connect(mapStateToProps, todosActions)(SaveTodo);
