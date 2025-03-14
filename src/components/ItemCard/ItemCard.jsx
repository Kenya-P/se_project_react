import './ItemCard.css';

function ItemCard({ item }) {
    return (
        <div className="cards__item">
            <h2>{item.name}</h2>
            <img className="cards__image" src={item.link} alt={item.name} />
        </div>
    );
}

export default ItemCard;