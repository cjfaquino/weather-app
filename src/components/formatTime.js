export const getTime = (unixTime, timezone) => {
  const msTime = unixTime * 1000;
  const timeString = new Date(msTime).toLocaleTimeString("en-US", {
    timeZone: timezone,
    timeStyle: "short",
  });

  return timeString;
};
export const getDay = (unixTime, timezone) => {
  const msTime = unixTime * 1000;
  const dayString = new Date(msTime).toLocaleString("en-US", {
    timeZone: timezone,
    weekday: "long",
  });

  return dayString;
};
