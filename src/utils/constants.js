export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL('../assets/day/Clear.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL('../assets/day/Cloudy.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL('../assets/day/Fog.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL('../assets/day/Rain.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL('../assets/day/Snow.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL('../assets/day/Storm.svg', import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL('../assets/night/NightClear.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL('../assets/night/NightCloudy.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL('../assets/night/NightFog.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL('../assets/night/NightRain.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL('../assets/night/NightSnow.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL('../assets/night/NightStorm.svg', import.meta.url).href,
  },
  
];

export const defaultWeatherOptions = {
  day: {
    url: new URL('../assets/day/DayDefault.svg', import.meta.url).href,
  },
  night: {
    url: new URL('../assets/night/NightDefault.svg', import.meta.url).href,
  },
};


export const coordinates = {
  latitude: 40.620720,
  longitude: -75.378487,
};

  export const APIkey = "a72b2d4265f1e7cfcff6e3f3ff7f9255";