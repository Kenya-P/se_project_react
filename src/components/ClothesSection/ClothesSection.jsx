import './ClothesSection.css';
import { defaultClothingItems } from '../../utils/constants';
import ItemCard from '../ItemCard/ItemCard';

function ClothesSection({handleItemClick}) {
    return (
        <div className="clothes__section">
            <div className="clothes__section-header">
                <p>Your Items</p>
                <button className="clothes__section-button">+ Add New</button>
            </div>
            <ul className="clothes__section-list">
                {defaultClothingItems.map((item) => {
                return <ItemCard key={item._id} item={item} onClick={handleItemClick} />;
                })}
            </ul>
        </div>
    );
};

export default ClothesSection;