import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import './GameRating.scss';

const Rating = ({ rating = 0, maxRating = 5 }) => {
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
