/* eslint-disable camelcase */
const getGeocode = async (city) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`
    );

    const [data] = await res.json();

    if (data !== undefined) {
      const { display_name, lat, lon } = data;
      const name = display_name.split(",")[0];
      return { lat, lon, name, cod: 200 };
    }

    const message = { cod: 404, message: "Could not find city." };
    return message;
  } catch (error) {
    return console.log(error);
  }
};

export default getGeocode;
