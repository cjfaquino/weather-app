import getWeather from "./components/openWeather";
import "./style.css";

const makeHeader = () => {
  const header = document.createElement("header");

  header.innerHTML = `
    <form>
      <label for="search"
        ><input 
        type="text" 
        name="search" 
        id="search"
        placeholder="Enter a city"
      /></label>
      <button type="submit">Search</button>
    </form>
  `;

  return header;
};

const makeMain = () => {
  const main = document.createElement("main");

  main.innerHTML = `
  <div class="results">
    <div class="current-temps"></div>
    <div class="other"></div>
    <div class="hourly-temps"></div>
    <div class="daily-temps"></div>
  </div>
  
  <div class="error"></div>
  `;

  return main;
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const getTime = (unixTime, timezone) => {
  const msTime = unixTime * 1000;
  const timeString = new Date(msTime).toLocaleTimeString("en-US", {
    timeZone: timezone,
    timeStyle: "short",
  });

  return timeString;
};

const getDay = (unixTime, timezone) => {
  const msTime = unixTime * 1000;
  const dayString = new Date(msTime).toLocaleString("en-US", {
    timeZone: timezone,
    weekday: "long",
  });

  return dayString;
};

const roundTemps = () => {
  const numberTemps = document.querySelectorAll(".number-temp");
  numberTemps.forEach((temp) => {
    temp.textContent = Math.round(temp.textContent);
  });
};

const makeCurrentCard = (name, current, daily, timezone) => {
  const {
    temp,
    dt: time,
    weather: [{ main: condition, icon, description }],
  } = current;

  const [
    {
      temp: { min, max },
    },
  ] = daily;

  const currentTime = getTime(time, timezone);

  const currentTemps = document.querySelector(".current-temps");
  currentTemps.innerHTML = `
  <div class="city-name">${name}</div>
  <div class="current-time"><span class="current-conditions">${condition}</span> ${currentTime}</div>
  <div class="current-temp"><span class="current-conditions"><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}"/></span> <span class="number-temp">${temp}</span>°</div>
  
  <div class="current-hi-lo">
    <span class="low-temp">L:<span class="low-temp"><span class="number-temp">${min}</span>°</span></span>
    <span class="high-temp">H:<span class="high-temp"><span class="number-temp">${max}</span>°</span></span>
  </div>
  `;
};

const makeOtherCard = (current, timezone) => {
  const {
    wind_speed: speed,
    feels_like: feelsLike,
    clouds: cloudiness,
    visibility,
    pressure,
    humidity,
    sunrise,
    sunset,
    uvi,
  } = current;

  const hgPressure = (pressure * 0.029529983071445).toFixed(2);
  const sunriseTime = getTime(sunrise, timezone);
  const sunsetTime = getTime(sunset, timezone);

  const other = document.querySelector(".other");
  other.innerHTML = `
  <div class="feels-like">Feels like <span><span class="number-temp">${feelsLike}</span>°</span></div>
  <div class="humidity">Humidity <span>${humidity}%</span></div>
  <div class="uvi">UV Index <span>${uvi}</span></div>
  <div class="cloudiness">Cloudiness <span>${cloudiness}%</span></div>
  <div class="cloudiness">Visibility <span><span class="number-distance">${visibility}</span> <span class="unit-distance">m</span></span></div>
  <div class="pressure">Pressure <span>${hgPressure} inHg</span></div>
  <div class="speed">Wind speed <span><span class="number-speed">${speed}</span> <span class="unit-speed">m/s</span></span></span></div>
  <div class="sunrise">Sunrise <span>${sunriseTime}</span></div>
  <div class="sunset">Sunset <span>${sunsetTime}</span></div>
  <div class="precipitation">Precipitation <span>.55 <span>mm</span></span></div>

  `;
};

const makeHourlyCard = (hourly, timezone) => {
  const {
    pop,
    temp,
    dt: time,
    weather: [{ icon, description }],
  } = hourly;

  const newTime = getTime(time, timezone);
  const splitTime = newTime.split(" ");
  const hour = splitTime[0].split(":")[0];
  const period = splitTime[1];
  const rainPerc = pop * 100;

  const hourlyTemps = document.querySelector(".hourly-temps");
  const card = document.createElement("div");

  card.classList.add("card-hourly");
  card.innerHTML = `
  <div class="hourly-time">${hour}<span class="period">${period}</span></div>
  <div class="hourly-rain">${rainPerc}%</div>
  <div class="hourly-conditions"><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}"/></div>
  <div class="hourly-temp"><span class="number-temp">${temp}</span>°</div>
  `;

  hourlyTemps.append(card);
  return card;
};

const makeDailyCard = (daily) => {
  const {
    weather: [{ icon, description }],
    temp: { min, max },
    dt: time,
    humidity,
    pop,
  } = daily;

  const rainPerc = pop * 100;
  const day = getDay(time);
  const dailyTemps = document.querySelector(".daily-temps");
  const card = document.createElement("div");

  card.classList.add("card-hourly");
  card.innerHTML = `
  <div class="weekday">${day}</div>
  <div class="daily-conditions"><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}"/></div>
  <div class="daily-temp"><span class="daily-lo"><span class="number-temp">${min}</span>°</span> <span class="daily-hi"><span class="number-temp">${max}</span>°</span></div>
  <div class="daily-rain">${rainPerc}%</div>
  <div class="daily-humidity">${humidity}%</div>
  `;

  dailyTemps.append(card);
};

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
  daily.forEach((day) => {
    makeDailyCard(day, timezone);
  });

  roundTemps();

  if (weather.message) {
    error.textContent = weather.message;
  }
};

document.body.append(makeHeader(), makeMain());

const form = document.querySelector("form");
const search = document.getElementById("search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  setWeather(search.value);
});

setWeather("baldwin park");
