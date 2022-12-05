import React, { FC } from 'react';
import { AiFillStar } from 'react-icons/ai';
import './GameRating.scss';

interface Props {
  rating: number;
  maxRating: number;
}

const Rating: FC<Props> = ({ rating = 0, maxRating = 5 }) => {
  return (
    <div className="rating">
      <AiFillStar />
      <p className="rating__number">
        {rating} / {maxRating}
      </p>
    </div>
  );
};

export default React.memo(Rating);
