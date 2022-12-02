import './GameDetails.scss';

import CommentsList from '../CommentsList/CommentsList';
import GameRating from '../GameRating/GameRating';
import React, { useEffect, useState } from 'react';

import { getGameDetails } from '../../services/games';

import HashLoader from 'react-spinners/HashLoader';

const GameDetails = ({ gameId, user }) => {
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getGameDetails(gameId).then((gameData) => {
      setGame(gameData);
      setIsLoading(false);
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
        <span className="game_date">{game?.released}</span>
        <span className="game__rating">
          <GameRating rating={game?.rating} maxRating={5.0} />
        </span>
        <div>
          <h3>Platforms</h3>
          <p>{game?.platforms?.map((p) => p.platform.name).join(', ')}</p>
        </div>
        <p className="game__description">
          {game?.description_raw || 'Game description not available'}
        </p>
      </div>
      <CommentsList user={user} gameId={gameId} />
    </article>
  );
};

export default React.memo(GameDetails);
