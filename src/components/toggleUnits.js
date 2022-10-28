import { getCurrentLocation } from "./currentLocation";
import setWeather from "./setWeather";

let unit = "imperial";

const changeWindSpeed = (str) => {
  const unitSpeed = document.querySelector(".unit-speed");
  unitSpeed.textContent = str;
};

const toggleUnits = async () => {
  const currentLocation = getCurrentLocation();
  if (unit === "imperial") {
    await setWeather(currentLocation, "metric");
    changeWindSpeed("m/s");
    unit = "metric";
  } else {
    await setWeather(currentLocation, "imperial");
    changeWindSpeed("mph");
    unit = "imperial";
  }
};

export default toggleUnits;
