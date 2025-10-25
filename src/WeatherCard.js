import React from "react";

export default function WeatherCard({ weather }) {
  // Guard clause: Don't render if data is not ready
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