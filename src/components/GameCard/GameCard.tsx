import React, { FC } from 'react';
import './GameCard.scss';

import GameRating from '../GameRating/GameRating';
import { IGame } from '../../models/game';
import { Link } from 'react-router-dom';

interface IProps {
  game: IGame;
}

const GameCard: FC<IProps> = ({ game }) => {
  return (
    <article className="game-card">
      <div className="game-card__image-container">
        <img src={game?.background_image} alt="" className="game-card__image" />
      </div>
      <div className="game-card__text">
        <h2 className="game-card__title">
          <Link className="game-card__link" to={`/games/${game.id}`}>
            {game?.name || 'Game Title'}
          </Link>
        </h2>
        <GameRating rating={game?.rating} maxRating={5.0} />
      </div>
    </article>
  );
};

export default React.memo(GameCard);
