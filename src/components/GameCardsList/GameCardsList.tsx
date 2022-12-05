import React, { FC } from 'react';
import './GameCardsList.scss';
import GameCard from '../GameCard/GameCard';
import { IGame } from '../../models/game';

interface IProps {
  games: IGame[];
}

const GameCardsList: FC<IProps> = ({ games }) => {
  return (
    <section className="games-container">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  );
};

export default React.memo(GameCardsList);
