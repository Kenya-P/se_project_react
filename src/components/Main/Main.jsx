import { useContext } from 'react';
import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import CurrentTempUnitContext from '../../contexts/CurrentTempUnit';

function Main({ weatherData, handleItemClick, clothingItems, onItemLike }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  const handleRandomizeClick = () => {
    if (!weatherData || !clothingItems?.length) return;

    const filteredItems = clothingItems.filter(item => item.weather === weatherData.type);
    if (filteredItems.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filteredItems.length);
    const randomItem = filteredItems[randomIndex];

    if (randomItem) {
      handleItemClick(randomItem);
    }
  };

  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        {weatherData?.temp?.[currentTempUnit] ? (
          <p className="cards__text">
            Today is {weatherData.temp[currentTempUnit]}&deg;{currentTempUnit}/ You may want to wear:
          </p>
        ) : (
          <p className="cards__text">Loading weather data...</p>
        )}
      </section>

      <ul className="cards__list">
        {clothingItems?.length > 0 &&
          clothingItems
            .filter(item => item.weather === weatherData?.type)
            .map(item => (
              <ItemCard
                key={item._id}
                item={item}
                onItemClick={handleItemClick}
                onItemLike={onItemLike}
              />
            ))}
      </ul>

      <button
        className="cards__randomize-button"
        type="button"
        onClick={handleRandomizeClick}
        disabled={!clothingItems?.length || !weatherData}
      >
        Randomize
      </button>
    </main>
  );
}

export default Main;