import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Menu = (props) => {
  return (
    <nav className="Menu">
      <Link to="/users">Users</Link>
      <Link to="/todos">Todos</Link>
    </nav>
  )
}

export default withRouter(Menu);
