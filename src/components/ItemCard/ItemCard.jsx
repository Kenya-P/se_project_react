import './ItemCard.css';
import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ItemCard({ item, onItemClick, onItemLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = currentUser && item.likes.some(id => id === currentUser._id);

  const handleCardClick = () => {
    onItemClick(item);
  };

  const handleLikeClick = () => {
    onItemLike({ _id: item._id, isLiked }); // Call prop with item object
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
          className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`}
          onClick={handleLikeClick}
        ></button>
      )}
    </li>
  );
}

export default ItemCard;
