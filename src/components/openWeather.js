import WEATHER_API from "../../secret";
import getGeocode from "./nominatim";

const getWeather = async (city, unit = "imperial") => {
  try {
    const geocode = await getGeocode(city);
    if (geocode.cod !== 200) {
      return geocode;
    }
    const { lat, lon, name } = geocode;

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=${unit}`
    );
    const data = await weatherRes.json();
    if (data.cod) {
      return {
        message: "Too many requests. Please try again at another time.",
      };
    }

    const { current, daily, hourly, minutely, timezone } = data;

    return { name, current, daily, hourly, minutely, timezone };
  } catch (error) {
    return console.log(error);
  }
};

export default getWeather;
