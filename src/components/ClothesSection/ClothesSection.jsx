import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import React, { useContext, useMemo } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import PropTypes from 'prop-types';

function ClothesSection({ onAddNew, onItemClick, clothingItems = [], onItemLike }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

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

ClothesSection.propTypes = {
  onAddNew: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onItemLike: PropTypes.func.isRequired,
};

export default ClothesSection;


