import getGeocode from "./nominatim";
import openWeather from "./openWeather";

const getCityWeather = async (city, unit) => {
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
    const weatherData = await openWeather(lat, lon, name, unit);
    loading.classList.add("hide");
    if (weatherData.cod) {
      const { message } = weatherData;
      return { message }; // get Open Weather error messages
    }
    const { current, daily, hourly, minutely, timezone } = weatherData;

    return { name, current, daily, hourly, minutely, timezone };
  } catch (error) {
    return console.log(error);
  }
};

export default getCityWeather;
