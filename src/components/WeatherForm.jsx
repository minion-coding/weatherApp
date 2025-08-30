import { useState } from "react";

function WeatherForm({ onFetchData }) {
  const [city, setCity] = useState("London");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city !== "") {
      onFetchData(city);
    }
  };

  return (
    <div className="bg-white/30 backdrop-blur-sm shadow-xl rounded-r-full mt-15 mb-6 w-3/5 transition-all">
      <input
        type="text"
        className="font-normal text-5xl px-2 text-white w-4/5"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}></input>
    </div>
  );
}

export default WeatherForm;
