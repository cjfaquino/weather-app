import { getTime } from "../formatTime";

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

export default makeOtherCard;
