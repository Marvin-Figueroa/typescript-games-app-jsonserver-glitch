import React, { FormEvent, FC, useEffect, useState, ChangeEvent } from 'react';
import Comment from '../Comment/Comment';
import './CommentsList.scss';

import { getCommentsByGame, createComment } from '../../services/comments';
import { getUsers } from '../../services/users';
import { IUser } from '../../models/user';
import { ICommentFromAPI } from '../../models/commentFromAPI';
import { IFormattedComment } from '../../models/formattedComment';
import { useAuth } from '../../hooks/useAuth';

interface IProps {
  gameId: string;
}

const CommentsList: FC<IProps> = ({ gameId }) => {
  const { user } = useAuth();

  const [comments, setComments] = useState<ICommentFromAPI[]>([]);
  const [formattedComments, setFormattedComments] = useState<
    IFormattedComment[]
  >([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>('');

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
      const userObj = users.find((usr) => usr.id === comment.user);
      return {
        ...comment,
        user: `${userObj?.name} ${userObj?.lastName}`,
      };
    });
    setFormattedComments(populatedCommentsUser);
  }

  function handleNewComment(e: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (user) {
      const newComment = {
        comment: newCommentText,
        gameId: Number(gameId),
        user: user.id,
      };

      createComment(newComment)
        .then((createdComment) => {
          setFormattedComments((prevComments) => [
            ...prevComments,
            { ...createdComment, user: `${user.name} ${user.lastName}` },
          ]);
        })
        .catch((error) => {
          // console.log(error);
        });
    }

    setNewCommentText('');
  }

  return (
    <div className="comments">
      <p className="comments_label">
        All comments ({formattedComments?.length})
      </p>
      {!user && (
        <p className="comments_label-add-comment">
          To add a comment you have to be logged in!
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        id="comments__new-comment"
        className="comments__new-comment"
      >
        <span className="new-comment-author">
          {user?.name + ' ' + user?.lastName}
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

      <div className="comments__container">
        {formattedComments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
export default React.memo(CommentsList);
