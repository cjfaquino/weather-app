import WEATHER_API from "../../secret";

const getWeather = async (city) => {
  try {
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_API}`
    );
    const geocode = await geoRes.json();

    if (geocode.length !== 0) {
      // on success
      const { lat, lon, name, state } = geocode[0];
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${WEATHER_API}&units=imperial`
      );
      const data = await weatherRes.json();
      const { current, daily, hourly, timezone } = data;

      return { name, state, current, daily, hourly, timezone };
    }

    const message = "City not found";
    return { message };
  } catch (error) {
    return console.log(error);
  }
};

export default getWeather;
