import React from 'react';
import './Comment.scss';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <span className="comment__user">{comment.user}</span>
      <p className="comment__text">{comment.comment}</p>
    </div>
  );
};

export default React.memo(Comment);
