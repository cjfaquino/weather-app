import WEATHER_API from "../../secret";
import getGeocode from "./nominatim";

const getWeather = async (city, unit) => {
  const loading = document.querySelector(".loading-screen");
  loading.classList.remove("hide");
  try {
    const geocode = await getGeocode(city);
    if (geocode.cod !== 200) {
      loading.classList.add("hide");
      return geocode;
    }
    const { lat, lon, name } = geocode;

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=${unit}`
    );
    const data = await weatherRes.json();
    loading.classList.add("hide");

    if (data.cod) {
      const { message } = data;
      return { message };
    }

    const { current, daily, hourly, minutely, timezone } = data;

    return { name, current, daily, hourly, minutely, timezone };
  } catch (error) {
    loading.classList.add("hide");
    return console.log(error);
  }
};

export default getWeather;
