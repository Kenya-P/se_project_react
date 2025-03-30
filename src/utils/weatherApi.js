export const getWeather = ({latitude, longitude}, APIkey) => {
    
    return fetch (
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
    ).then(_handleResponse);

    function _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    };

};

const isDay = ({ sunrise, sunset }, now) => {
    return sunrise * 1000 < now && now < sunset * 1000;
};

export const filterWeatherData = (data) => {
    const result = {};

    result.cty = data.name;
    result.temp = { F: Math.round(data.main.temp), C: Math.round((data.main.temp - 32) * 5 / 9) };
    result.type = getWeatherType(data.main.temp);
    result.condition = weatherConditionMap[data.weather[0].main.toLowerCase()] || data.weather[0].main;
    result.isDay = isDay(data.sys, Date.now());
    return result;
};

const getWeatherType = (temp) => {
    if (temp >= 86) {
        return 'hot';
      } else if (temp >= 66 && temp < 86) {
        return 'warm';
      } else {
        return 'cold';
      }
};

const weatherConditionMap = {
    'clouds': 'Cloudy',
    'clear': 'Clear',
    'rain': 'Rainy',
    'snow': 'Snowy',
    'thunderstorm': 'Thunderstorm',
    'mist': 'Mist',
    'fog': 'Fog',
    // ... add more conditions as needed

};
