import React from "react";

export const WeatherInfo = ({ weather }) => {
  if (!weather) return <p>Loading weather...</p>;
  return (
    <div className="weather-info">
      <p>
        {weather.condition} - {weather.temp}°C
      </p>
    </div>
  );
};
