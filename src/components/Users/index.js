import React from 'react';
import { connect } from 'react-redux'
import * as usersActions from '../../actions/usersActions'
import { Spinner } from '../Spinner';

class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  drawUserRows() {
    return this.props.users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
      </tr>
    ))
  }

  showContent() {
    return (
      this.props.loading
        ? <Spinner />
        : (
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
        )
    )
  }

  render() {
    console.log(`this.props`, this.props)
    return <>
      {this.showContent()}
    </>
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
}

export default connect(mapStateToProps, usersActions)(Users);
