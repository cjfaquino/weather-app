import { getTime } from "../formatTime";

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

export default makeCurrentCard;
