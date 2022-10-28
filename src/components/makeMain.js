const makeMain = () => {
  const main = document.createElement("main");

  main.innerHTML = `
  <div class="results">
    <div class="top-half wrapper">
      <div class="current-temps"></div>
      <div class="hourly-temps"></div>
      </div>
    <div class="other"></div>
    <div class="daily-temps wrapper"></div>
  </div>
  
  <div class="error"></div>
  `;

  return main;
};

export default makeMain;
