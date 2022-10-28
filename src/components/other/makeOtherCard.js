import { getTime } from "../formatTime";

const makeOtherCard = (current, minutely, timezone) => {
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
  const [{ precipitation }] = minutely;

  const hgPressure = (pressure * 0.029529983071445).toFixed(2);
  const sunriseTime = getTime(sunrise, timezone);
  const sunsetTime = getTime(sunset, timezone);

  const other = document.querySelector(".other");
  other.innerHTML = `
  <div class="feels-like"><span class="other-label">Feels like</span> <span><span class="number-temp">${feelsLike}</span>°</span></div>
  <div class="humidity"><span class="other-label">Humidity</span> <span>${humidity}%</span></div>
  <div class="uvi"><span class="other-label">UV Index</span> <span>${uvi}</span></div>
  <div class="cloudiness"><span class="other-label">Cloudiness</span> <span>${cloudiness}%</span></div>
  <div class="cloudiness"><span class="other-label">Visibility</span> <span><span class="number-distance">${visibility}</span> <span class="unit-distance">m</span></span></div>
  <div class="pressure"><span class="other-label">Pressure</span> <span>${hgPressure} inHg</span></div>
  <div class="speed"><span class="other-label">Wind speed</span> <span><span class="number-speed">${speed}</span> <span class="unit-speed">m/s</span></span></span></div>
  <div class="sunrise"><span class="other-label">Sunrise</span> <span>${sunriseTime}</span></div>
  <div class="sunset"><span class="other-label">Sunset</span> <span>${sunsetTime}</span></div>
  <div class="precipitation"><span class="other-label">Precipitation</span> <span>${precipitation}<span> mm</span></span></div>
  `;
};

export default makeOtherCard;
