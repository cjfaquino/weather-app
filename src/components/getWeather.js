import getGeocode from "./nominatim";
import { openWeather, getCityName } from "./openWeather";

export const getCityWeather = async (city, unit = "imperial") => {
  const loading = document.querySelector(".loading-screen");
  loading.classList.remove("hide");

  try {
    // get lat & lon of query from nominatim
    const geocode = await getGeocode(city);
    if (geocode.cod !== 200) {
      loading.classList.add("hide");
      return geocode; // get geocode error messages
    }
    const { lat, lon, name } = geocode;

    // then get weather data from open weather
    const weatherData = await openWeather(lat, lon, unit);
    loading.classList.add("hide");
    if (weatherData.cod) {
      return weatherData; // get Open Weather error messages
    }
    const { current, daily, hourly, minutely, timezone } = weatherData;

    return { name, current, daily, hourly, minutely, timezone };
  } catch (error) {
    return console.log(error);
  }
};

export const getCurrentLocationWeather = async () => {
  const loading = document.querySelector(".loading-screen");

  const getPosition = async () =>
    new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej, {
        timeout: 5000,
      });
    });

  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lon } = position.coords;

    loading.classList.remove("hide");
    const city = await getCityName(lat, lon);
    const [{ name }] = city;

    // then get weather data from open weather
    const weatherData = await openWeather(lat, lon);
    loading.classList.add("hide");
    if (weatherData.cod) {
      return weatherData; // get Open Weather error messages
    }
    const { current, daily, hourly, minutely, timezone } = weatherData;

    return { name, current, daily, hourly, minutely, timezone };
  } catch (error) {
    return error;
  }
};
