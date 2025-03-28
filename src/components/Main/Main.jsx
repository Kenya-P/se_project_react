import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import CurrentTempUnitContext from '../../contexts/CurrentTempUnit';
import { useContext } from 'react';



function Main({ weatherData, handleItemClick, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  const handleRandomizeClick = () => {
    const filteredItems = clothingItems.filter((item) => {
      return item.weather === weatherData.type;
    });
    
    const randomIndex = Math.floor(Math.random() * filteredItems.length);
    const randomItem = filteredItems[randomIndex];

    handleItemClick(randomItem);

  }

  return(
    <main className="content">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">Today is {weatherData.temp[currentTempUnit]}&deg;{currentTempUnit}/ You may want to wear:</p>
      </section>
      <ul className="cards__list">
        {clothingItems.filter((item) => {
          return item.weather === weatherData.type;
        }).map((item) => {
          return <ItemCard key={item._id} item={item} onCardClick={handleItemClick} />;
        })}
      </ul>
      <button className="cards__randomize-button" type="button" onClick={handleRandomizeClick} >Randomize</button>
    </main>
  );
}

export default Main;