const makeHeader = () => {
  const header = document.createElement("header");

  header.innerHTML = `
    <form class="wrapper">
      <button type="button" class="geolocation"><i class="fa-solid fa-location-crosshairs"></i></button>
      <label for="search"
        ><input 
        type="text" 
        name="search" 
        id="search"
        placeholder="Enter a city"
      /></label>
      <button type="submit">Search</button>
      <button type="button" class="toggle-units">Metric: °C, meters/ Imperial: °F, miles</button>
      
    </form>
  `;

  return header;
};

export default makeHeader;
