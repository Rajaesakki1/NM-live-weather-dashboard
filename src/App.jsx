import React, { useState } from "react";
import "./App.css";

function WeatherCard({ weather }) {
  if (!weather || !weather.location || !weather.current) {
    return null;
  }
  const {
    location: { name, country },
    current: {
      temperature,
      humidity,
      weather_descriptions,
      wind_speed,
      weather_icons,
      feelslike,
    },
  } = weather;

  return (
    <div className="weather-card">
      <h2 className="city-country">
        {name}, {country}
      </h2>
      <img
        src={weather_icons[0]}
        alt={weather_descriptions[0]}
        className="weather-icon"
      />
      <div className="weather-details">
        <div className="temp">
          <span className="temp-value">{temperature}°C</span>
          <span className="desc">{weather_descriptions[0]}</span>
        </div>
        <div className="stats">
          <span>Feels like: {feelslike}°C</span>
          <span>Humidity: {humidity}%</span>
          <span>Wind: {wind_speed} km/h</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_KEY = "8943dcf64c073e97f6c59d23854597ec"; // your Weatherstack key

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(
          cityName
        )}`
      );
      const data = await res.json();
      // Debug line: see what comes from the API
      // console.log(data);
      if (data.error) throw new Error(data.error.info || "City not found!");
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchWeather(city);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="app-container">
      <div className="dashboard">
        <h1 className="dashboard-title">
          <span role="img" aria-label="weather">☁️</span> SkySense
        </h1>
        <form className="city-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            className="city-input"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button className="fetch-btn" type="submit">
            Get Weather
          </button>
        </form>
        {loading && <div className="loader">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {weather && !error && <WeatherCard weather={weather} />}
        <footer className="footer">
          Powered by Weatherstack | Made with React
        </footer>
      </div>
    </div>
  );
}