const makeHeader = () => {
  const header = document.createElement("header");

  header.innerHTML = `
    <form class="wrapper">
      <label for="search"
        ><input 
        type="text" 
        name="search" 
        id="search"
        placeholder="Enter a city"
      /></label>
      <button type="submit">Search</button>
    </form>
  `;

  return header;
};

export default makeHeader;
