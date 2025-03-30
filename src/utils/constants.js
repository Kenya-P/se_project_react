export const weatherOptions = [
  {
    day: true,
    condition: "Clear",
    url: new URL('../assets/day/Clear.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: "Cloudy",
    url: new URL('../assets/day/Cloudy.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: "Fog",
    url: new URL('../assets/day/Fog.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: "Rain",
    url: new URL('../assets/day/Rain.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: "Snow",
    url: new URL('../assets/day/Snow.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: "Storm",
    url: new URL('../assets/day/Storm.svg', import.meta.url).href,
  },

  {
    day: false,
    condition: "Clear",
    url: new URL('../assets/night/NightClear.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: "Cloudy",
    url: new URL('../assets/night/NightCloudy.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: "Fog",
    url: new URL('../assets/night/NightFog.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: "Rain",
    url: new URL('../assets/night/NightRain.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: "Snow",
    url: new URL('../assets/night/NightSnow.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: "Storm",
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