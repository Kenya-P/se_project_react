import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';

function ClothesSection({onClick, clothingItems}) {
    return (
        <div className="clothes__section">
            <div className="clothes__section-header">
                <p>Your Items</p>
                <button className="clothes__section-button" onClick={onClick}>+ Add New</button>
            </div>
            <ul className="clothes__section-list">
                {clothingItems.map((item) => {
                return <ItemCard key={item._id} item={item} onClick={onClick} />;
                })}
            </ul>
        </div>
    );
};

export default ClothesSection;