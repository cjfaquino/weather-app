const makeDailyHeadings = () => {
  const dailyTemps = document.querySelector(".daily-temps");

  const headings = document.createElement("div");

  headings.classList.add("daily-headings");
  headings.classList.add("card-daily");
  headings.innerHTML = `
  <div>Day</div>
  <div class="daily-conditions"> </div>
  <div class="daily-temp">Low/High</div>
  <div class="daily-rain">Rain</div>
  <div class="daily-humidity">Humidity</div>
  `;

  dailyTemps.append(headings);
};

export default makeDailyHeadings;
