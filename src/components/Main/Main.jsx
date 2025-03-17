import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';


function Main({ weatherData, handleItemClick }) {

  const handleRandomizeClick = () => {
    const filteredItems = defaultClothingItems.filter((item) => {
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
        <p className="cards__text">Today is {weatherData.temp.F}&deg; F/ You may want to wear:</p>
      </section>
      <ul className="cards__list">
        {defaultClothingItems.filter((item) => {
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