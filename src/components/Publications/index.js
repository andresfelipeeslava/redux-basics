import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as usersActions from '../../actions/components/usersActions';
import * as publicationsActions from '../../actions/components/publicationsActions';

const { getUsers: getAllUsers} = usersActions;
const { getSoleUser: getPublicationsByUser} = publicationsActions;

class Publications extends Component {
  
  async componentDidMount() {
    const {
      match,
      usersReducer,
      getAllUsers,
      getPublicationsByUser,
    } = this.props;

    if (!usersReducer.users.length) {
      await getAllUsers();
    }
    
    await getPublicationsByUser(match.params.key);
  }
  
  render() {
    console.log(`this.props <──`, this.props)
    return (
      <div className="margin-2rem">
        <h2>Publicaciones de: </h2>
        {this.props.match.params.key}
      </div>
    )
  }
}

const mapStateToProps = ({ usersReducer, publicationsReducer}) => {
  return {
    usersReducer,
    publicationsReducer
  };
};

const mapDispatchToProps = {
  getAllUsers,
  getPublicationsByUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Publications));