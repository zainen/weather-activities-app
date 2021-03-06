import { useState } from "react";

import axios from "axios";
import "../main.css";
import "./day_weather.css";

interface DayWeatherProps extends WeatherProps<DayWeather> {
  setWeekWeather: (weather: WeekWeather) => void;
}

const DayWeather: React.FC<DayWeatherProps> = (props) => {
  const [query, setQuery] = useState<string>();
  const { weather, setWeather, setWeekWeather } = props;

  const search = (e: Search) => {
    if (e.key === "Enter" || e.key === "Return") {
      axios({
        method: "post",
        url: "http://localhost:8001/api/dayweather",
        data: { query },
      })
        .then((res) => {
          if (res.data) {
            setWeather(res.data.day);
            setWeekWeather(res.data.week);
          }
        })
        .catch((e) => console.log(e));
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search...       Vancouver,ca"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
        />
      {weather && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather ? weather.name : "-"}</span>
            <sup className="country">{weather ? weather.sys.country : "-"}</sup>
          </h2>
          <div>
            <pre id="weather-temp">
              Max {weather ? Math.round(weather.main.temp_max) : "-"}
              <sup className="deg">&deg;C</sup> Min{" "}
              {weather ? Math.round(weather.main.temp_min) : "-"}
              <sup className="deg">&deg;C</sup>
            </pre>
          </div>
          <div className="parent_div">
            <div className="city-temp">
              {weather ? Math.round(weather.main.temp) : "-"}
              <sup className="deg">&deg;C</sup>
            </div>
            <div className="info">
              <img
                className="condition-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather ? weather.weather[0].description : "-"}
              />
              <p id="weather-description">
                {weather ? weather.weather[0].description : "-"}
              </p>
            </div>
          </div>
          <div id="feels">
            <pre>
              Feels like {weather ? Math.round(weather.main.feels_like) : "-"}
              <sup>&deg;C</sup>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
export default DayWeather;
