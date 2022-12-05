import { ICommentFromAPI } from '../models/commentFromAPI';
import { ICommentToAPI } from '../models/commentToAPI';
import { get, post } from './http';

export async function getCommentsByGame(gameId: string) {
  const gameComments = await get<ICommentFromAPI[]>(
    `${process.env.REACT_APP_GLITCH_BASE_URL}/comments?gameId=${gameId}`
  );

  return gameComments;
}

export async function createComment(comment: ICommentToAPI) {
  const newComment = await post<ICommentToAPI, ICommentFromAPI>(
    `${process.env.REACT_APP_GLITCH_BASE_URL}/comments`,
    comment,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return newComment;
}
