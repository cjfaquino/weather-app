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
  const date = new Date(msTime);
  const timeString = new Date(date).toLocaleTimeString("en-US", {
    timeZone: timezone,
    timeStyle: "short",
  });

  return timeString;
};

const makeCurrentCard = (name, state, current, daily, timezone) => {
  const conditions = current.weather[0].main;
  const temp = Math.round(current.temp);
  const hiTemp = Math.round(daily[0].temp.max);
  const loTemp = Math.round(daily[0].temp.min);
  const currentTime = getTime(current.dt, timezone);

  const currentTemps = document.querySelector(".current-temps");
  currentTemps.innerHTML = `
  <div class="city-name">${name}, ${state}</div>
  <div class="current-time">Currently ${currentTime}</div>
      <div class="current-conditions">${conditions}</div>
      <div class="current-temp">${temp}°</div>
      <div class="current-hi-lo">
        <div class="low-temp">L:<span class="low-temp">${hiTemp}°</span></div>
        <div class="high-temp">H:<span class="high-temp">${loTemp}°</span></div>
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
  const roundedFeels = Math.round(feelsLike);
  const sunriseTime = getTime(sunrise, timezone);
  const sunsetTime = getTime(sunset, timezone);

  const other = document.querySelector(".other");
  other.innerHTML = `
  <div class="feels-like">Feels like <span>${roundedFeels}°</span></div>
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
  const conditions = hourly.weather[0].main;
  const temp = Math.round(hourly.temp);
  const time = getTime(hourly.dt, timezone);
  const splitTime = time.split(" ");
  const hour = splitTime[0].split(":")[0];

  const hourlyTemps = document.querySelector(".hourly-temps");
  const card = document.createElement("div");

  card.classList.add("card-hourly");
  card.innerHTML = `
  <div class="hourly-time">${hour}<span class="period">${splitTime[1]}</span></div>
  <div class="hourly-conditions">${conditions}</div>
  <div class="hourly-temp">${temp}°</div>
  `;

  hourlyTemps.append(card);
  return card;
};

const setWeather = async (location) => {
  const results = document.querySelector(".results");
  const hourlyTemps = document.querySelector(".hourly-temps");
  const error = document.querySelector(".error");

  const weather = await getWeather(location);

  removeAllChildNodes(hourlyTemps);

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
