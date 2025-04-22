import React, { useState, useEffect } from "react";
import { MoodSelector } from "./MoodSelector";
import { CalendarView } from "./CalendarView";
import { saveEntry, getEntries } from "./storage";
import DarkModeToggle from "./DarkMood";
import "./App.css";

function App() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [entries, setEntries] = useState([]);
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const savedEntries = getEntries();
    setEntries(savedEntries);
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ lat: latitude, lon: longitude });
    });
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      const apiKey = "ad606f37039c336995d840e31ce69533";
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather({
            temp: data.main.temp,
            condition: data.weather[0].main,
          });
        })
        .catch((error) => console.error("Error fetching weather:", error));
    }
  }, [location]);

  const handleSubmit = () => {
    if (!mood || !note) return alert("Please select mood and write a note.");
    const entry = { date, mood, note, weather };
    saveEntry(entry);
    setEntries((prev) => [...prev, entry]);
    setMood("");
    setNote("");
    alert("Entry saved!");
  };
  const getWeatherIcon = (condition) => {
    const weatherIconMap = {
      Clear: "☀️", // Clear sky
      Clouds: "☁️", // Cloudy
      Rain: "🌧️", // Rainy
      Snow: "❄️", // Snowy
      Thunderstorm: "⚡", // Thunderstorm
      Drizzle: "🌦️", // Light rain
    };
    return weatherIconMap[condition] || "🌤️"; // Default to partly cloudy
  };
  return (
    <div className={`app mood-${mood}`}>
      <div className="header">
        <h1>MoodMate</h1>
        <div className="weather-display">
          {weather ? (
            <>
              <span className="weather-icon">
                {getWeatherIcon(weather.condition)}
              </span>
              {weather.temp}°C - {weather.condition}
            </>
          ) : (
            "Loading weather..."
          )}
        </div>
        <DarkModeToggle />
      </div>

      <div className="split-container">
        <div className="left-panel">
          <div className="entry-card">
            <p>How are you feeling today?</p>
            <MoodSelector selectedMood={mood} onMoodSelect={setMood} />
            <textarea
              placeholder="Add a note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button onClick={handleSubmit}>Save</button>
          </div>
        </div>

        <div className="right-panel">
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <CalendarView entries={entries} />
    </div>
  );
}

export default App;
