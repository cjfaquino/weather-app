import { getCurrentLocation } from "./currentLocation";
import setWeather from "./setWeather";

let unit = "imperial";

const toggleUnits = () => {
  const currentLocation = getCurrentLocation();
  if (unit === "imperial") {
    setWeather(currentLocation, "metric");
    console.log(currentLocation);
    unit = "metric";
  } else {
    setWeather(currentLocation, "imperial");
    unit = "imperial";
  }
};

export default toggleUnits;
