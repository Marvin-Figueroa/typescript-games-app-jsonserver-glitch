import HttpClient from './http';

const http = new HttpClient();

export async function getCommentsByGame(gameId) {
  const gameComments = await http.get(
    process.env.REACT_APP_GLITCH_BASE_URL + `/comments?gameId=${gameId}`
  );

  return gameComments;
}

export async function createComment(comment) {
  const newComment = await http.post(
    process.env.REACT_APP_GLITCH_BASE_URL + '/comments',
    comment
  );

  return newComment;
}
