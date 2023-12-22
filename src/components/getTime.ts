export const getTime = (sun: any) => {
  const sunTime = new Date(sun * 1000);
  const finTime =
    (sunTime.getHours() < 10 ? "0" : "") +
    sunTime.getHours() +
    ":" +
    (sunTime.getMinutes() < 10 ? "0" : "") +
    sunTime.getMinutes();
  return finTime;
};
