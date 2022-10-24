import { getTime } from "../formatTime";

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

export default makeHourlyCard;
