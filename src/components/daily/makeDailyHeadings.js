const makeDailyHeadings = () => {
  const dailyTemps = document.querySelector(".daily-temps");

  const headings = document.createElement("div");

  headings.classList.add("daily-headings");
  headings.classList.add("card-daily");
  headings.innerHTML = `
  <div class="weekday">Day</div>
  <div class="daily-conditions"> </div>
  <div class="daily-temp">Temperature</div>
  <div class="daily-rain">Chance of rain</div>
  <div class="daily-humidity">Humidity</div>
  `;

  dailyTemps.append(headings);
};

export default makeDailyHeadings;
