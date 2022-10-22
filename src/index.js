import getWeather from "./components/openWeather";

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
  <div class="results">
      <div class="current-temps">
        <div class="city-name"></div>
        <div class="conditions"></div>
        <div class="current-temp"></div>
        <div class="hi-lo">
          <div class="high-temp">H:<span class="high-temp"></span></div>
          <div class="low-temp">L:<span class="low-temp"></span></div>
        </div>
      </div>
    </div>
  `;

  return main;
};

const setWeather = async (location) => {
  const results = document.querySelector(".results");
  const cityName = results.querySelector(".city-name");
  const conditions = results.querySelector(".conditions");
  const currentTemp = results.querySelector(".current-temp");
  const currentHigh = results.querySelector("span.high-temp");
  const currentLow = results.querySelector("span.low-temp");

  const weatherData = await getWeather(location);

  if (weatherData.cod === 200) {
    cityName.textContent = weatherData.name;
    conditions.textContent = weatherData.weather[0].main;
    currentTemp.textContent = weatherData.main.temp;
    currentHigh.textContent = weatherData.main.temp_max;
    currentLow.textContent = weatherData.main.temp_min;
  } else console.log(weatherData);
};

document.body.append(makeHeader(), makeMain());

const form = document.querySelector("form");
const search = document.getElementById("search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  setWeather(search.value);
});
