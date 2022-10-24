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

  removeAllChildNodes(hourlyTemps);
  removeAllChildNodes(dailyTemps);

  const { name, current, daily, hourly, timezone } = weather;

  // current conditons
  makeCurrentCard(name, current, daily, timezone);

  // other data
  makeOtherCard(current, timezone);

  // hourly conditions
  for (let i = 0; i < 24; i++) {
    const element = hourly[i];
    makeHourlyCard(element, timezone);
  }

  // daily conditions
  makeDailyHeadings();
  daily.forEach((day) => {
    makeDailyCard(day, timezone);
  });

  roundTemps();

  if (weather.message) {
    error.textContent = weather.message;
  }
};

export default setWeather;
