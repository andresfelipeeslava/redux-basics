import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as usersActions from '../../actions/components/usersActions';
import * as publicationsActions from '../../actions/components/publicationsActions';
import { Spinner } from '../Spinner'
import { Fatal } from '../Fatal'

const { getUsers: getAllUsers} = usersActions;
const { getUniqueUser: getPublicationsByUser, openAndClosePublications } = publicationsActions;

class Publications extends Component {
  
  async componentDidMount() {
    const {
      match: { params: { key } },
      getAllUsers,
      getPublicationsByUser,
    } = this.props;

    if (!this.props.usersReducer.users.length) await getAllUsers();

    if (this.props.usersReducer.error) return;
    
    if (!('publicationsKey' in this.props.usersReducer.users[key]))
      await getPublicationsByUser(key);
  }
  
  setUser = () => {
    const {
      match: { params: { key } },
      usersReducer
    } = this.props;

    if (!usersReducer.users.length || usersReducer.loading)
      return <Spinner />;
    if (usersReducer.error)
      return <Fatal message={usersReducer.error} />;

    return <div className="publications_name">
      <span>Publications of:
      <b>{` ${usersReducer.users[key].name}`}</b>
      </span>
    </div>;
  }

  setPublications = () => {
    const {
      usersReducer,
      publicationsReducer,
      usersReducer: { users },
      publicationsReducer: { publications },
      match: { params: { key } }
    } = this.props;
    // Se revisa info del usuario
    if (!users.length) return; // la información del usuario no existe
    if (usersReducer.error) return; // la información del usuario tiene error
    // Se revisa info de las publicaciones
    if (publicationsReducer.loading) // info publicaciones cargando
      return <Spinner />;
    if (publicationsReducer.error) // la información de publicaciones tiene error
      return <Fatal message={publicationsReducer.error} />;
    // Se revisan que las publicaciones se encuentren
    if (!publications.length) return; // la información de publicaciones no existe
    if (!('publicationsKey' in users[key])) return;  // la información de publicaciones por user no existe

    const { publicationsKey } = users[key];

    return this.showInformation(
      publications[publicationsKey],
      publicationsKey,
    );
  }

  showInformation = (publications, publicationsKey) => {

    return publications.map((publication, commentKey) => (
      <div
        key={`${publication.userId}_${publication.id}`}
        className="publications_body"
        onClick={() => this.props.openAndClosePublications(publicationsKey, commentKey)}
      >
        <h4> {publication.title}
        </h4>
        <span>{publication.body}</span>
      </div>
    ));
  };

  render() {
    // console.log(`this.props <──`, this.props)
    return (
      <div className="margin-2rem">
        {this.setUser()}
        {this.setPublications()}
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
  openAndClosePublications
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Publications));