import PUBLIC_WEATHER_API from "../../secret";

const getWeather = async (city, state, country, units = "imperial") => {
  try {
    const [weatherRes, hourlyRes] = await Promise.all([
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&APPID=${PUBLIC_WEATHER_API}&units=${units}`
      ),
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${country}&APPID=${PUBLIC_WEATHER_API}&units=${units}`
      ),
    ]);
    const [weather, hourly] = await Promise.all([
      weatherRes.json(),
      hourlyRes.json(),
    ]);
    return { weather, hourly };
  } catch (error) {
    return console.log(error);
  }
};

export default getWeather;
