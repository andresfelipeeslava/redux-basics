import React from 'react';
import { connect } from 'react-redux'
import * as usersActions from '../../actions/usersActions'

class Users extends React.Component {  
  componentDidMount() {
    this.props.getUsers();
  }

  drawUserRows() {
    return this.props.users.map( user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
      </tr>
    ))
  }

  render() {
    console.log(`this.props`, this.props)
    return (
    <table className="App">
      <thead>
        <tr>
          <th>
            Nombre
          </th>
          <th>
            Correo
          </th>
          <th>
            Enlace
          </th>
        </tr>
      </thead>
      <tbody>
        {this.drawUserRows()}
      </tbody>
    </table>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
}

export default connect(mapStateToProps, usersActions)(Users);
