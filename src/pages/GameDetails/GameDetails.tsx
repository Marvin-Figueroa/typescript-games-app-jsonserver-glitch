import './GameDetails.scss';

import CommentsList from '../../components/CommentsList/CommentsList';
import GameRating from '../../components/GameRating/GameRating';
import React, { FC, useEffect, useReducer } from 'react';

import { getGameDetails } from '../../services/games';

import HashLoader from 'react-spinners/HashLoader';
import { IGameDetail } from '../../models/gameDetail';
import { PlatformElement } from '../../models/gameDetail';

import { initialState, gameReducer } from '../../utils/gameReducer';

import { useParams } from 'react-router-dom';

const GameDetails: FC = () => {
  const [{ isLoading, error, game }, dispatch] = useReducer(
    gameReducer,
    initialState
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    getGameDetails(id || '')
      .then((gameData: IGameDetail) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: gameData });
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_ERROR', payload: error.toString() });
      });
  }, []);

  if (isLoading) {
    return <HashLoader color="#fb8500" />;
  }

  return (
    <article className="game">
      <img src={game?.background_image} alt="" className="game__image" />
      <div className="game__info">
        <h2 className="game__title">{game?.name}</h2>
        <span className="game_date">
          {game?.released
            ? new Date(game.released).toLocaleDateString()
            : 'No date available'}
        </span>
        <span className="game__rating">
          <GameRating rating={game?.rating || 0} maxRating={5.0} />
        </span>
        <div>
          <h3>Platforms</h3>
          <p>
            {game?.platforms
              ?.map((p: PlatformElement) => p.platform.name)
              .join(', ')}
          </p>
        </div>
        <p className="game__description">
          {game?.description_raw || 'Game description not available'}
        </p>
      </div>
      <CommentsList gameId={id || ''} />
    </article>
  );
};

export default React.memo(GameDetails);
