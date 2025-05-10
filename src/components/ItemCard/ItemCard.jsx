import './ItemCard.css';
import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ItemCard({ item, onItemClick, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = item.likes.some(id => id === currentUser._id);
  const likeButtonClassName = `card__like-button ${isLiked ? 'card__like-button_active' : ''}`;

  const handleCardClick = () => {
    onItemClick(item);
  };

  const handleLike = () => {
    onCardLike(item); // Call prop with item object
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {/* Show like button only if user is logged in */}
      {currentUser._id && (
        <button
          type="button"
          className={likeButtonClassName}
          onClick={handleLike}
          aria-label={isLiked ? 'Unlike item' : 'Like item'}
        />
      )}
    </li>
  );
}

export default ItemCard;
