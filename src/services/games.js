import HttpClient from './http';

const http = new HttpClient();

const apiUrl = process.env.REACT_APP_API_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export async function getGameDetails(gameId) {
  const gameDetails = await http.get(
    apiUrl + `/games/${gameId}?key=663ba57cd49444e18a052cdc458cc5e6`
  );

  return gameDetails;
}

export async function getPaginatedGames(
  pageNumber = 1,
  pageSize = 8,
  searchQuery = ''
) {
  const gamesResult = await http.get(
    apiUrl +
      `/games?page=${pageNumber}&page_size=${pageSize}&key=${apiKey}${
        searchQuery.trim() !== ''
          ? '&search_precise=true&search=' + searchQuery
          : ''
      }`
  );

  return gamesResult;
}
