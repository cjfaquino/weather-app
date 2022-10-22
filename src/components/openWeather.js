import PUBLIC_WEATHER_API from "../../secret";

const getWeather = async (city, state, country, units = "imperial") => {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&APPID=${PUBLIC_WEATHER_API}&units=${units}`
    );

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default getWeather;
