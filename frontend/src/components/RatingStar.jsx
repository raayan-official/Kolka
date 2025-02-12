import React from 'react';

const Rating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let className = 'ri-star-line'; // Default to empty star

    if (i <= rating) {
      className = 'ri-star-fill'; // Fully filled star
    } else if (i <= rating) {
      className = 'ri-star-half-line'; // Half-filled star
    }

    stars.push(
      <span key={i} className={className}></span>
    );
  }

  return <div className='product__rating'>{stars}</div>;
};

export default Rating;
