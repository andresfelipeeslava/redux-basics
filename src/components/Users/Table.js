import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../styles/components/Table.css';

const Table = (props) => {
  const drawUserRows = () => props.users.map(
    (user, key) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
        <td>
          <Link to={`/publications/${key}`}>
            <div className="sun-horizon-solid icon"></div>
          </Link>
        </td>
      </tr>
    )
  )
  
  return (
    <table className="App">
      <thead>
        <tr>
          <th>
            Nombre
          </th>
          <th>
            Email
          </th>
          <th>
            Enlace
          </th>
        </tr>
      </thead>
      <tbody>
        {drawUserRows()}
      </tbody>
    </table>
  )
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer
}

export default connect(mapStateToProps)(Table);
