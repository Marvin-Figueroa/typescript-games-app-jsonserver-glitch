import { IGameDetail } from '../models/gameDetail';

type stateType = {
  isLoading: boolean;
  game: IGameDetail | null;
  error: string;
};

export const initialState: stateType = {
  isLoading: false,
  game: null,
  error: '',
};

type ActionType =
  | {
      type: 'FETCH_START';
    }
  | {
      type: 'FETCH_SUCCESS';
      payload: IGameDetail | null;
    }
  | {
      type: 'FETCH_ERROR';
      payload: string;
    };

export const gameReducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        isLoading: true,
        error: '',
        game: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        game: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        isLoading: false,
        error: action.payload,
        game: null,
      };
    default:
      return state;
  }
};
