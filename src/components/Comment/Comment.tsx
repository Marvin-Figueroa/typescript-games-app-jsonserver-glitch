import React, { FC } from 'react';
import { IFormattedComment } from '../../models/formattedComment';

import './Comment.scss';

interface IProps {
  comment: IFormattedComment;
}

const Comment: FC<IProps> = ({ comment }) => {
  return (
    <div className="comment">
      <span className="comment__user">{comment.user}</span>
      <p className="comment__text">{comment.comment}</p>
    </div>
  );
};

export default React.memo(Comment);
