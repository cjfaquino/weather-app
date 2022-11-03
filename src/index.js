import "./style.css";
import makeHeader from "./components/header/makeHeader";
import makeMain from "./components/makeMain";
import {
  setCurrentLocationWeather,
  setSearchedWeather,
} from "./components/setWeather";
import toggleUnits from "./components/toggleUnits";

document.body.append(makeHeader(), makeMain());

const form = document.querySelector("form");
const search = document.getElementById("search");
const toggle = document.querySelector(".toggle-units");
const geolocation = document.querySelector(".geolocation");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  setSearchedWeather(search.value);
});

toggle.addEventListener("click", toggleUnits);
geolocation.addEventListener("click", setCurrentLocationWeather);

setCurrentLocationWeather();
setSearchedWeather("Los Angeles");
