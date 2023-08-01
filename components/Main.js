import React, { useEffect, useState } from "react";
import "../css/style.css";

const Main = () => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [cityName, setCityName] = useState("Lahore");
  const [weatherType, setWeatherType] = useState("");
  const fetchWeather = async (city) => {
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d71ecc2884d1f6aa5f665661c8f3a7f4`;
      const response = await fetch(URL);
      const data = await response.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weatherMood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country } = data.sys;

      const newWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherMood,
        name,
        speed,
        country,
      };

      setWeatherInfo(newWeatherInfo);

      // Update weatherType based on weatherMood
      switch (weatherMood) {
        case "Clouds":
          setWeatherType("wi-day-cloudy");
          break;
        case "Haze":
          setWeatherType("wi-fog");
          break;
        case "Clear":
          setWeatherType("wi-day-sunny");
          break;
        case "Mist":
          setWeatherType("wi-dust");
          break;
        default:
          setWeatherType("wi-day-sunny");
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleData = (event) => {
    event.preventDefault();
    fetchWeather(cityName);
  };

  useEffect(() => {
    fetchWeather(cityName); // Fetch weather data for Lahore when the component loads initially
  }, []);
  return (
    <>
      <div className="main">
        <form
          action=""
          className="d-flex justify-content-center"
          onSubmit={handleData}>
          <input
            type="text"
            className="search-bar rounded-2"
            placeholder="Enter Your City"
            value={cityName}
            onChange={(event) => {
              setCityName(event.target.value);
            }}
          />
          <button className="btn btn-primary mx-2 p-1" type="submit">
            Search
          </button>
        </form>
        {weatherInfo ? (
          <div className="maincard mt-3">
            <div className="temp-box-name">
              <span className="location-name">
                <i className="fa-solid fa-location-dot"></i>
                <span className="name">
                  {weatherInfo.name} {weatherInfo.country}
                </span>
                <p className="temp">Temp: {weatherInfo.temp} &deg;</p>
                <p className="min-temp">Min-Temp: 22 &deg;</p>
                <p className="max-temp">Max-Temp: 27 &deg;</p>
              </span>
            </div>
            <div className="image">
              <i className={`wi ${weatherType}`}></i>
            </div>
            <div className="other-info">
              <p className="pressure font">Pressure: {weatherInfo.pressure}</p>
              <p className="humidity font">Humidity: {weatherInfo.humidity}</p>
              <p className="wind-speed font">Wind Speed: {weatherInfo.speed}</p>
            </div>
          </div>
        ) : (
          <h1>Loading Data ....</h1>
        )}
      </div>
    </>
  );
};

export default Main;
