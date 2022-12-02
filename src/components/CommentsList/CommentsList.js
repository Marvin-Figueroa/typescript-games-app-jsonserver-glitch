import React, { useEffect, useState } from 'react';
import Comment from '../Comment/Comment';
import './CommentsList.scss';

import { getCommentsByGame, createComment } from '../../services/comments';
import { getUsers } from '../../services/users';

const CommentsList = ({ gameId, user }) => {
  const [comments, setComments] = useState([]);
  const [formattedComments, setFormattedComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    getCommentsByGame(gameId).then((commentsData) => setComments(commentsData));
    getUsers().then((usersData) => setUsers(usersData));
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      populateCommentsWithUsername();
    }
  }, [users]);

  // In populateCommentsWithUsername I change the "user" property, instead of the id value, I return the full name
  // {
  //   "id": 1,
  //   "comment": "Test comment on game #1",
  //   "gameId": 1,
  //   "user": 1
  // }
  // {
  //   "id": 1,
  //   "comment": "Test comment on game #1",
  //   "gameId": 1,
  //   "user": "Juan Perez"
  // }

  function populateCommentsWithUsername() {
    const populatedCommentsUser = comments?.map((comment) => {
      const userObj = users.find((us) => us.id === comment.user);
      return {
        ...comment,
        user: `${userObj?.name} ${userObj?.lastName}`,
      };
    });
    setFormattedComments(populatedCommentsUser);
  }

  function handleNewComment(e) {
    setNewCommentText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newComment = {
      comment: newCommentText,
      gameId: gameId,
      user: user.id,
    };

    createComment(newComment)
      .then((response) => response.json())
      .then((createdComment) => {
        setFormattedComments((prevComments) => [
          ...prevComments,
          { ...createdComment, user: `${user.name} ${user.lastName}` },
        ]);

        setNewCommentText('');
      });
  }

  return (
    <div className="comments">
      <p className="comments_label">All comments ({comments?.length})</p>
      {!user && (
        <p className="comments_label-add-comment">
          To add a comment you have to be logged in!
        </p>
      )}
      {user && (
        <form
          onSubmit={handleSubmit}
          id="comments__new-comment"
          className="comments__new-comment"
        >
          <span className="new-comment-author">
            {user.name + ' ' + user.lastName}
          </span>
          <textarea
            value={newCommentText}
            onChange={handleNewComment}
            className="new-comment__text"
            name="new-comment"
            id="new-comment"
            placeholder="Enter your comment..."
          />
          <button
            className="new-comment__submit"
            disabled={newCommentText.trim() === ''}
          >
            Add comment
          </button>
        </form>
      )}

      <div className="comments__container">
        {formattedComments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
export default React.memo(CommentsList);
