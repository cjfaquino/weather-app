const makeMain = () => {
  const main = document.createElement("main");

  main.innerHTML = `
  <div class="loading-screen">
    <div class="loader"></div>
  </div>
  <div class="results">
    <div class="error wrapper"></div>
    <div class="top-half wrapper">
      <div class="current-temps"></div>
      <div class="hourly-temps"></div>
      </div>
    <div class="other"></div>
    <div class="daily-temps wrapper"></div>
  </div>
  
  `;

  return main;
};

export default makeMain;
