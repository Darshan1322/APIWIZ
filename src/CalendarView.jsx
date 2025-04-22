export const CalendarView = ({ entries }) => (
  <div className="calendar-view">
    <h2>All Notes</h2>
    <div className="notes-grid">
      {entries.map((entry, index) => (
        <div key={index} className="note-card">
          <div className="note-mood">{getMoodIcon(entry.mood)}</div>
          <div className="note-text">{entry.note}</div>
          <div className="note-footer">
            <span>{new Date(entry.date).toLocaleDateString()}</span>
            <span className="weather-info">
              {getWeatherIcon(entry.weather?.condition)} {entry.weather?.temp}°C
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const getMoodIcon = (mood) => {
  const iconMap = {
    happy: "😊",
    sad: "😢",
    angry: "😠",
    excited: "🤩",
    calm: "😌",
  };
  return iconMap[mood] || "🙂";
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
