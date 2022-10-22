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
    <div class="current-temps">
      <div class="city-name"></div>
      <div class="current-conditions"></div>
      <div class="current-temp"></div>
      <div class="current-hi-lo">
        <div class="low-temp">L:<span class="low-temp"></span></div>
        <div class="high-temp">H:<span class="high-temp"></span></div>
      </div>
    </div>
  </div>
  
  <div class="error hide"></div>
  `;

  return main;
};

const setWeather = async (location) => {
  const results = document.querySelector(".results");
  const error = document.querySelector(".error");
  const cityName = results.querySelector(".city-name");
  const currentConditions = results.querySelector(".current-conditions");
  const currentTemp = results.querySelector(".current-temp");
  const currentHigh = results.querySelector("span.high-temp");
  const currentLow = results.querySelector("span.low-temp");

  const data = await getWeather(location);
  const currentWeather = data.weather;

  if (currentWeather.cod === 200) {
    results.classList.remove("hide");
    cityName.textContent = currentWeather.name;
    currentConditions.textContent = currentWeather.weather[0].main;
    currentTemp.textContent = Math.round(currentWeather.main.temp);
    currentHigh.textContent = Math.round(currentWeather.main.temp_max);
    currentLow.textContent = Math.round(currentWeather.main.temp_min);
  } else {
    error.classList.remove("hide");
    error.textContent = currentWeather.message;
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
