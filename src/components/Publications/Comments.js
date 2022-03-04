import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../Spinner';
import { Fatal } from '../Fatal';

const Comments = (props) => {
  const setComments = () => {
    if (props.commentsError) return <Fatal message={props.commentsError} />;
    if (props.commentsLoading && !props.comments.length) return <Spinner />;

    return showContent(props.comments);
  };
  const showContent = (comments) => {
    return comments.map((comment) => (
      <li key={comment.id}>
        <b>{comment.email}</b>
        <p>{comment.body}</p>
      </li>
    ));
  }

  return (<>
    <h4>Comments</h4>
    <ul>
      {setComments()}
    </ul>
  </>)
};

const mapStateToProps = ({ publicationsReducer }) => {
  return publicationsReducer;
};

export default connect(mapStateToProps)(Comments);
