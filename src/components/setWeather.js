import { getCityWeather, getCurrentLocationWeather } from "./getWeather";
import makeCurrentCard from "./current/makeCurrentCard";
import makeOtherCard from "./other/makeOtherCard";
import makeHourlyCard from "./hourly/makeHourlyCard";
import makeDailyCard from "./daily/makeDailyCard";
import removeAllChildNodes from "./removeAllChildNodes";
import roundTemps from "./roundTemps";
import makeDailyHeadings from "./daily/makeDailyHeadings";
import { setCurrentLocation } from "./currentLocation";

const setWeather = async (data, unit) => {
  const hourlyTemps = document.querySelector(".hourly-temps");
  const dailyTemps = document.querySelector(".daily-temps");
  const error = document.querySelector(".error");

  const weather = await data;

  if (weather.message) {
    error.classList.add("active");
    error.textContent = weather.message;
    return;
  }
  error.textContent = "";
  error.classList.remove("active");

  removeAllChildNodes(hourlyTemps);
  removeAllChildNodes(dailyTemps);

  const { name, current, daily, hourly, minutely, timezone } = weather;
  setCurrentLocation(name);

  // current conditons
  makeCurrentCard(name, current, daily, timezone);

  // other data
  makeOtherCard(current, minutely, timezone, unit);

  // hourly conditions
  hourly.forEach((hour) => {
    makeHourlyCard(hour, timezone);
  });

  // daily conditions
  makeDailyHeadings();
  daily.shift();
  daily.forEach((day) => {
    makeDailyCard(day, timezone);
  });

  roundTemps();
};

export const setCurrentLocationWeather = async () => {
  const weather = await getCurrentLocationWeather();
  setWeather(weather, "imperial");
};

export const setSearchedWeather = async (location, unit = "imperial") => {
  const weather = await getCityWeather(location, unit);
  setWeather(weather, unit);
};
