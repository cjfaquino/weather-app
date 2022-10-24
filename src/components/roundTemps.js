const roundTemps = () => {
  const numberTemps = document.querySelectorAll(".number-temp");
  numberTemps.forEach((temp) => {
    temp.textContent = Math.round(temp.textContent);
  });
};

export default roundTemps;
