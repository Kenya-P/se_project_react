import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import React, { useContext, useMemo } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ClothesSection({ onAddNew, onItemClick, clothingItems = [], onItemLike }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = useMemo(() => {
    if (!currentUser?._id) return [];
    return clothingItems.filter(item => item.owner === currentUser._id);
  }, [clothingItems, currentUser]);

  return (
    <div className="clothes__section">
      <div className="clothes__section-header">
        <p>Your Items</p>
        <button className="clothes__section-button" onClick={onAddNew}>+ Add New</button>
      </div>

      <ul className="clothes__section-list">
        {userItems.map(item => (
          <ItemCard
            key={item._id}
            item={item}
            onItemClick={onItemClick}
            onItemLike={onItemLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;


