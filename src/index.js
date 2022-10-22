import getWeather from "./components/openWeather";

const makeHeader = () => {
  const header = document.createElement("header");

  header.innerHTML = `
  <header>
      <label for="search"
        ><input type="text" name="search" id="search"
      /></label>
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

document.body.append(makeHeader(), makeMain());
