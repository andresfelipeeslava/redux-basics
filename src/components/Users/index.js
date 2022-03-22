import React from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/components/usersActions';
import { Spinner } from '../Spinner';
import { Fatal } from '../Fatal';
import Table from './Table';
import '../../styles/components/Users.css';

class Users extends React.Component {
  componentDidMount() {
    if(!this.props.users.length) {
      this.props.getUsers();
    }
  }

  showContent = () => {
    // Loading state
    if (this.props.loading)
      return <Spinner />

    // Error state
    if (this.props.error) 
      return <Fatal message={this.props.error}/>

    // Success state
    return <Table users={this.props.users}/>
  }

  render() {
    // console.log(`this.props ─>`, this.props)
    return (
      <div className="margin-2rem">
        <h1>Users</h1>
        {this.showContent()}
      </div>
    )
  }
}

const mapStateToProps = ( reducers ) => {
  return reducers.usersReducer;
}

export default connect(mapStateToProps, usersActions)(Users);
