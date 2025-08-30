import { useState } from "react";
import "./styles/App.css";

import WeatherApp from "./components/WeatherApp";

function App() {
  const fetchWeather = async (city) => {
    try {
      // Step 1: Get the latitude and longitude for the city
      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const locationData = await locationResponse.json();

      if (locationData.results.length === 0) {
        setError("City not found");
        return;
      }

      console.log(locationData.results[0]);

      const { latitude, longitude } = locationData.results[0];

      // Step 2: Fetch the weather data using the latitude and longitude
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_mean,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`
      );
      const weather = await weatherResponse.json();

      setWeatherData(weather);
      setError("");
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  return (
    <WeatherApp></WeatherApp>
  );
}

export default App;
