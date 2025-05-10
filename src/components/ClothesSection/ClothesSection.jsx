import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ClothesSection({ onAddNew, onItemClick, clothingItems }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Filter items that belong to the current user
  const userItems = clothingItems.filter(item => item.owner === currentUser._id);

  return (
    <div className="clothes__section">
      <div className="clothes__section-header">
        <p>Your Items</p>
        <button className="clothes__section-button" onClick={onAddNew}>+ Add New</button>
      </div>
      <ul className="clothes__section-list">
        {userItems.map((item) => (
          <ItemCard key={item._id} item={item} onItemClick={onItemClick} />
        ))}
      </ul>
    </div>
  );
};

export default ClothesSection;
