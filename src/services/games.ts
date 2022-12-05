import { IAPIResponse } from '../models/apiResponse';
import { IGameDetail } from '../models/gameDetail';
import { get } from './http';

export async function getGameDetails(gameId: string) {
  const gameDetails = await get<IGameDetail>(
    `${process.env.REACT_APP_API_BASE_URL}/games/${gameId}?key=${process.env.REACT_APP_API_KEY}`
  );

  return gameDetails;
}

export async function getPaginatedGames(
  pageNumber = 1,
  pageSize = 8,
  searchQuery = ''
) {
  const gamesResult = await get<IAPIResponse>(
    `${
      process.env.REACT_APP_API_BASE_URL
    }/games?page=${pageNumber}&page_size=${pageSize}&key=${
      process.env.REACT_APP_API_KEY
    }${
      searchQuery.trim() !== ''
        ? '&search_precise=true&search=' + searchQuery
        : ''
    }`
  );

  return gamesResult;
}
