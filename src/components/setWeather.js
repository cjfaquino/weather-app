import getWeather from "./openWeather";
import makeCurrentCard from "./current/makeCurrentCard";
import makeOtherCard from "./other/makeOtherCard";
import makeHourlyCard from "./hourly/makeHourlyCard";
import makeDailyCard from "./daily/makeDailyCard";
import removeAllChildNodes from "./removeAllChildNodes";
import roundTemps from "./roundTemps";
import makeDailyHeadings from "./daily/makeDailyHeadings";

const setWeather = async (location) => {
  const hourlyTemps = document.querySelector(".hourly-temps");
  const dailyTemps = document.querySelector(".daily-temps");
  const error = document.querySelector(".error");

  const weather = await getWeather(location);
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

  // current conditons
  makeCurrentCard(name, current, daily, timezone);

  // other data
  makeOtherCard(current, minutely, timezone);

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
