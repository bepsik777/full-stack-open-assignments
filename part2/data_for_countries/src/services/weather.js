import axios from "axios";

const api_key = import.meta.env.VITE_OPENWEATHER_KEY;
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";

const getWeatherIconCode = (city) => {
  if (!api_key) {
    return new Promise((resolve, reject) => {
      reject("no api key found");
    });
  }
  return axios.get(`${baseURL}q=${city}&appid=${api_key}`).then((res) => {
    return res.data.weather[0].icon;
  });
};

export default { getWeatherIconCode };
