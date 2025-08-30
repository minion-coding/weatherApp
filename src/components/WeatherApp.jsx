import { useState, useEffect, Fragment } from "react";

import WeatherCard from "./WeatherCard";
import WeatherForm from "./WeatherForm";
import WeatherDetailInfo from "./WeatherDetailInfo";
import LoadingIndicator from "./LoadingIndicator";

function WeatherApp() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeather("London");
  }, []);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const locationData = await locationResponse.json();

      if (locationData.results.length === 0) {
        setError("City not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude } = locationData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_mean,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`
      );
      const weather = await weatherResponse.json();

      const temperatures = weather.daily.temperature_2m_mean;
      const weathercodes = weather.daily.weathercode.map((val) => {
        if (val <= 1) {
          return "clear";
        } else if (val === 2) {
          return "cloudy";
        } else if (val === 3) {
          return "overcast";
        } else if (val < 80) {
          return "rainy";
        } else {
          return "violent";
        }
      });

      const newDatas = temperatures.map((val, index) => ({
        weather: weathercodes[index],
        temperature: val,
        time: weather.daily.time[index],
      }));

      setDatas(newDatas);
      setError(""); // Clear previous errors on successful fetch
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      <WeatherForm onFetchData={fetchWeather} />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Fragment>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error message */}
          {datas.length > 0 && (
            <WeatherDetailInfo w={datas[0].weather} t={datas[0].temperature} />
          )}
          <div className="flex flex-row gap-1 justify-between w-full h-full">
            {datas.slice(0, 5).map((val) => (
              <WeatherCard
                w={val.weather}
                t={val.temperature}
                key={val.time} // Ensure time is unique
                time={val.time}
              />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default WeatherApp;
