const openWeather = async (lat, lon, name, unit) => {
  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}&units=${unit}`
    );
    const data = await weatherRes.json();

    return data;
  } catch (error) {
    return console.log(error);
  }
};

export default openWeather;
