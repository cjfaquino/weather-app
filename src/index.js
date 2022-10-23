import getWeather from "./components/openWeather";
import "./style.css";

const makeHeader = () => {
  const header = document.createElement("header");

  header.innerHTML = `
  <header>
    <form>
      <label for="search"
        ><input type="text" name="search" id="search"
      /></label>
      <button type="submit">Search</button>
    </form>
  </header>
  `;

  return header;
};

const makeMain = () => {
  const main = document.createElement("main");

  main.innerHTML = `
  <div class="results hide">
    <div class="current-temps"></div>
    <div class="other"></div>
    <div class="hourly-temps"></div>
    <div class="daily-temps"></div>
  </div>
  
  <div class="error hide"></div>
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

const makeCurrentCard = (name, state, current, daily, timezone) => {
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
  <div class="city-name">${name}, ${state}</div>
  <div class="current-time">Currently ${currentTime}</div>
  <div class="current-conditions"><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}"/></div>
  <div class="current-conditions">${condition}</div>
  <div class="current-temp">${temp}°</div>
  <div class="current-hi-lo">
    <div class="low-temp">L:<span class="low-temp">${min}°</span></div>
    <div class="high-temp">H:<span class="high-temp">${max}°</span></div>
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

  const miVisibility = (visibility / 1609).toFixed(2);
  const hgPressure = (pressure * 0.029529983071445).toFixed(2);
  const sunriseTime = getTime(sunrise, timezone);
  const sunsetTime = getTime(sunset, timezone);

  const other = document.querySelector(".other");
  other.innerHTML = `
  <div class="feels-like">Feels like <span>${feelsLike}°</span></div>
  <div class="humidity">Humidity <span>${humidity}%</span></div>
  <div class="uvi">UV Index <span>${uvi}</span></div>
  <div class="cloudiness">Cloudiness <span>${cloudiness}%</span></div>
  <div class="cloudiness">Visibility <span>${miVisibility}</span><span class="distance">mi</span></div>
  <div class="pressure">Pressure <span>${hgPressure} inHg</span></div>
  <div class="speed">Wind speed <span>${speed} mph</span></div>
  <div class="rise-set">
    <div class="sunrise">Sunrise <span>${sunriseTime}</span></div>
    <div class="sunset">Sunset <span>${sunsetTime}</span></div>
  </div>
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
  <div class="hourly-temp">${temp}°</div>
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
  <div class="daily-temp"><span class="daily-hi">${max}</span> <span class="daily-lo">${min}</span></div>
  <div class="daily-rain">${rainPerc}%</div>
  <div class="daily-humidity">${humidity}%</div>
  `;

  dailyTemps.append(card);
};

const setWeather = async (location) => {
  const results = document.querySelector(".results");
  const hourlyTemps = document.querySelector(".hourly-temps");
  const dailyTemps = document.querySelector(".daily-temps");
  const error = document.querySelector(".error");

  const weather = await getWeather(location);

  removeAllChildNodes(hourlyTemps);
  removeAllChildNodes(dailyTemps);

  if (!weather.message) {
    const { name, state, current, daily, hourly, timezone } = weather;
    results.classList.remove("hide");

    // current conditons
    makeCurrentCard(name, state, current, daily, timezone);

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
  } else {
    error.classList.remove("hide");
    error.textContent = weather.message;
  }
};

document.body.append(makeHeader(), makeMain());

const form = document.querySelector("form");
const search = document.getElementById("search");
const results = document.querySelector(".results");
const error = document.querySelector(".error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  results.classList.add("hide");
  error.classList.add("hide");
  setWeather(search.value);
});

setWeather("baldwin park");
