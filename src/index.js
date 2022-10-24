import "./style.css";
import makeHeader from "./components/makeHeader";
import makeMain from "./components/makeMain";
import setWeather from "./components/setWeather";

document.body.append(makeHeader(), makeMain());

const form = document.querySelector("form");
const search = document.getElementById("search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  setWeather(search.value);
});

setWeather("Los Angeles");
