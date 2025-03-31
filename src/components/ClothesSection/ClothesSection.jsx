import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';

function ClothesSection({onAddNew, onItemClick, clothingItems}) {
    return (
        <div className="clothes__section">
            <div className="clothes__section-header">
                <p>Your Items</p>
                <button className="clothes__section-button" onClick={onAddNew}>+ Add New</button>
            </div>
            <ul className="clothes__section-list">
                {clothingItems.map((item) => {
                return <ItemCard key={item._id} item={item} onItemClick={onItemClick} />;
                })}
            </ul>
        </div>
    );
};

export default ClothesSection;