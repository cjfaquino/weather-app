export const openWeather = async (lat, lon, unit = "imperial") => {
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

export const getCityName = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.WEATHER_API}`
    );
    const data = await res.json();

    return data;
  } catch (error) {
    return console.log(error);
  }
};
