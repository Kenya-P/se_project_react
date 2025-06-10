import './ItemCard.css';
import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ItemCard({ item, onItemClick, onItemLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = currentUser && item.likes.some(id => id === currentUser._id);

  const handleCardClick = () => {
    onItemClick(item);
  };

  const handleLikeClick = () => {
    onItemLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card">
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="card__info">
        <h2 className="card__name">{item.name}</h2>
        {/* Show like button only if user is logged in */}
        {currentUser && currentUser._id && (
          <button
            type="button"
            className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`}
            onClick={handleLikeClick}
          ></button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
