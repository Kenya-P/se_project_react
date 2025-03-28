import './WeatherCard.css';
import { weatherOptions, defaultWeatherOptions } from '../../utils/constants';
import { useContext } from 'react';
import CurrentTempUnitContext from '../../contexts/CurrentTempUnit';

function WeatherCard({weatherData}) {
    const { currentTempUnit } = useContext(CurrentTempUnitContext);
    const filteredOptions = weatherOptions.filter((option) => {
        return (
            option.day === weatherData.isDay && 
            option.condition.toLowerCase() === weatherData.condition.toLowerCase()
        );
    });

    let weatherOption;
    if (filteredOptions.length === 0) {
        weatherOption = defaultWeatherOptions[weatherData.isDay ? 'day' : 'night'];
    } else {
         weatherOption = filteredOptions[0];
    }

    return (
        <section className="weather-card">
            <p className="weather-card__temp">{weatherData.temp[currentTempUnit]}&deg;{currentTempUnit}</p>
            <img src={weatherOption?.url} alt={weatherOption?.condition} className="weather-card__image" />
        </section>
    )
}

export default WeatherCard;