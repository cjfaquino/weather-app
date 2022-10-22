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
    <div class="three-hourly-temps"></div>
  </div>
  
  <div class="error hide"></div>
  `;

  return main;
};

const makeCurrentCard = (currentWeather) => {
  const city = currentWeather.name;
  const conditions = currentWeather.weather[0].main;
  const temp = Math.round(currentWeather.main.temp);
  const hiTemp = Math.round(currentWeather.main.temp_max);
  const loTemp = Math.round(currentWeather.main.temp_min);

  const currentTemps = document.querySelector(".current-temps");
  currentTemps.innerHTML = `
  <div class="city-name">${city}</div>
      <div class="current-conditions">${conditions}</div>
      <div class="current-temp">${temp}</div>
      <div class="current-hi-lo">
        <div class="low-temp">L:<span class="low-temp">${hiTemp}</span></div>
        <div class="high-temp">H:<span class="high-temp">${loTemp}</span></div>
  </div>
  `;
};

const makeHourlyCard = (hourlyData) => {
  const time = hourlyData.dt_txt.split(" ")[1].split(":")[0];
  const conditions = hourlyData.weather[0].main;
  const temp = Math.round(hourlyData.main.temp);

  const threeHourly = document.querySelector(".three-hourly-temps");
  const card = document.createElement("div");

  card.classList.add("card-3hourly");
  card.innerHTML = `
  <div class="3hourly-time">${time}</div>
  <div class="3hourly-conditions">${conditions}</div>
  <div class="3hourly-temp">${temp}</div>
  `;

  threeHourly.append(card);
  return card;
};

const setWeather = async (location) => {
  const results = document.querySelector(".results");
  const error = document.querySelector(".error");

  const data = await getWeather(location);
  const currentWeather = data.weather;
  const hourlyWeather = data.hourly;

  if (currentWeather.cod === 200 && data.hourly.cod === "200") {
    results.classList.remove("hide");

    // current conditons
    makeCurrentCard(currentWeather);

    // every 3rd hour conditions
    for (let i = 0; i < 5; i++) {
      const element = hourlyWeather.list[i];
      makeHourlyCard(element);
    }
  } else {
    error.classList.remove("hide");
    error.textContent = currentWeather.message || hourlyWeather.message;
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

setWeather("london");
