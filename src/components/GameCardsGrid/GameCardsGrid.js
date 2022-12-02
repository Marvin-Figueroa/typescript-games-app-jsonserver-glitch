import React from 'react';
import './GameCardsGrid.scss';
import GameCard from '../GameCard/GameCard';

const GameCardsGrid = ({ games, handleGameSelect }) => {
  return (
    <section className="games-container">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          handleGameSelect={handleGameSelect}
        />
      ))}
    </section>
  );
};

export default React.memo(GameCardsGrid);
