import './WeatherCard.css';
import sunny from '../../assets/Sunny.svg';


function WeatherCard() {
    return (
        <section className="weather-card">
            <p className="weather-card__temp"></p>
            <img src={sunny} alt="Sunny" className="weather-card__image" />
        </section>
    )
}

export default WeatherCard;