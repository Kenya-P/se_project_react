export const getWeather = ({latitude, longitude}, APIkey) => {
    
    function _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    };
    
    return fetch (
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
    ).then(_handleResponse);

};

export const filterWeatherData = (data) => {
    const result = {};

    result.cty = data.name;
    result.temp = { F: data.main.temp };
    result.type = getWeatherType(data.main.temp);
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

