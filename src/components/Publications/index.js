import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as usersActions from '../../actions/components/usersActions';
import * as publicationsActions from '../../actions/components/publicationsActions';
import Comments from './Comments';
import { Spinner } from '../Spinner';
import { Fatal } from '../Fatal';

const { getUsers: getAllUsers } = usersActions;
const {
  getUniqueUser: getPublicationsByUser,
  openAndClosePublications,
  getComments,
} = publicationsActions;

class Publications extends Component {

  async componentDidMount() {
    const {
      match: { params: { key } },
      getAllUsers,
      getPublicationsByUser,
    } = this.props;

    if (!this.props.usersReducer.users.length) await getAllUsers();

    if (this.props.usersReducer.error) return;

    if (!('userPublicationsKey' in this.props.usersReducer.users[key]))
      await getPublicationsByUser(key);
  }

  getUser = () => {
    const {
      match: { params: { key } },
      usersReducer
    } = this.props;

    if (!usersReducer.users.length || usersReducer.loading)
      return <Spinner />;
    if (usersReducer.error)
      return <Fatal message={usersReducer.error} />;

    return this.showUserInfo(usersReducer, key);
  }
  showUserInfo = (usersReducer, key) => (
    <div className="publications_name">
      <span>Publications of:
        <b>{` ${usersReducer.users[key].name}`}</b>
      </span>
    </div>
  )

  getPublications = () => {
    const {
      usersReducer,
      publicationsReducer,
      usersReducer: { users },
      publicationsReducer: { publications },
      match: { params: { key } }
    } = this.props;

    // Se valida info del usuario
    // la información del usuario no existe
    if (!users.length) return;
    // la información del usuario tiene error
    if (usersReducer.error) return;

    // Se revisa info de las publicaciones
    // info publicaciones cargando
    if (publicationsReducer.loading)
      return <Spinner />;
    // la información de publicaciones tiene error
    if (publicationsReducer.error)
      return <Fatal message={publicationsReducer.error} />;

    // Se revisa que las publicaciones se encuentren
    // la información de publicaciones no existe
    if (!publications.length) return;
    // la información de publicaciones por user no existe
    if (!('userPublicationsKey' in users[key])) return;

    // Se extrae la posición de las publicaciones del usuario de todas las publicaciones
    const { userPublicationsKey } = users[key];

    return this.showPublicationsInfo(
      publications[userPublicationsKey],
      userPublicationsKey,
    );
  }
  showPublicationsInfo = (userPublications, userPublicationsKey) => {
    return userPublications.map((publication, publicationCommentsKey) => (
      <div
        key={`${publication.userId}_${publication.id}`}
        className="publications_body"
        onClick={
          () => this.showComments(
            userPublicationsKey, 
            publicationCommentsKey, 
            publication.comments
          )
        }
      >
        <h4> {publication.title}
        </h4>
        {
          (publication.isOpen)
            ? <div>
              <p>{publication.body}</p>
              <Comments />
            </div>
            : <span>Abrir</span>
        }
      </div>
    ));
  };

  showComments = (userPublicationsKey, publicationCommentsKey, comments) => {
    this.props.openAndClosePublications(userPublicationsKey, publicationCommentsKey);
    if (!comments.length) this.props.getComments(userPublicationsKey, publicationCommentsKey);
  }

  render() {
    console.log(`this.props <──`, this.props)
    return (
      <div className="margin-2rem">
        {this.getUser()}
        {this.getPublications()}
      </div>
    )
  }
}

const mapStateToProps = ({ usersReducer, publicationsReducer }) => {
  return {
    usersReducer,
    publicationsReducer
  };
};

const mapDispatchToProps = {
  getAllUsers,
  getPublicationsByUser,
  openAndClosePublications,
  getComments
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Publications));