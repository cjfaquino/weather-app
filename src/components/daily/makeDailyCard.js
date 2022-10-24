import { getDay } from "../formatTime";

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
  <div class="daily-temp"><span class="daily-lo"><span class="number-temp">${min}</span>°</span> <span class="daily-hi"><span class="number-temp">${max}</span>°</span></div>
  <div class="daily-rain">${rainPerc}%</div>
  <div class="daily-humidity">${humidity}%</div>
  `;

  dailyTemps.append(card);
};

export default makeDailyCard;
