import React from 'react';
import './GameCard.scss';

import GameRating from '../GameRating/GameRating';

const GameCard = ({ game, handleGameSelect }) => {
  return (
    <article className="game-card">
      <div className="game-card__image-container">
        <img src={game?.background_image} alt="" className="game-card__image" />
      </div>
      <div className="game-card__text">
        <h2 className="game-card__title">
          <button
            onClick={() => {
              if (!game) return;
              handleGameSelect(game.id);
            }}
          >
            {game?.name || 'This game has no name'}
          </button>
        </h2>
        <GameRating rating={game?.rating} maxRating={5.0} />
      </div>
    </article>
  );
};

export default React.memo(GameCard);
