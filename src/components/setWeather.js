import getWeather from "./openWeather";
import makeCurrentCard from "./current/makeCurrentCard";
import makeOtherCard from "./other/makeOtherCard";
import makeHourlyCard from "./hourly/makeHourlyCard";
import makeDailyCard from "./daily/makeDailyCard";
import removeAllChildNodes from "./removeAllChildNodes";
import roundTemps from "./roundTemps";
import makeDailyHeadings from "./daily/makeDailyHeadings";
import { setCurrentLocation } from "./currentLocation";

const setWeather = async (location, unit = "imperial") => {
  const hourlyTemps = document.querySelector(".hourly-temps");
  const dailyTemps = document.querySelector(".daily-temps");
  const error = document.querySelector(".error");

  const weather = await getWeather(location, unit);
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

export default setWeather;
