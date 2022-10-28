import "./style.css";
import makeHeader from "./components/header/makeHeader";
import makeMain from "./components/makeMain";
import setWeather from "./components/setWeather";
import toggleUnits from "./components/toggleUnits";

document.body.append(makeHeader(), makeMain());

const form = document.querySelector("form");
const search = document.getElementById("search");
const toggle = document.querySelector(".toggle-units");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  setWeather(search.value);
});

toggle.addEventListener("click", toggleUnits);

setWeather("Los Angeles");
