import { useState } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weeks = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function WeatherCard({ w, t, time }) {
  const [timestamp, setTimestamp] = useState(new Date(time));

  const getWeekDay = () => {
    return weeks[timestamp.getDay()];
  };

  const getDate = () => {
    const m = months[timestamp.getMonth()];
    const d = timestamp.getDate();
    return m + " " + d;
  };

  return (
    <div className="flex flex-col gap-1 w-fit weather-card">
      <div className="flex justify-center align-middle bg-sky-50/40 rounded-sm backdrop-blur-sm group-hover:bg-sky-100/50 py-3 px-3">
        <img
          className="w-25 h-16 object-contain"
          src={`./src/assets/${w}.png`}
        />
      </div>
      <div className="flex flex-col align-middle bg-sky-50/40 rounded-sm backdrop-blur-sm group-hover:bg-sky-100/50 h-full">
        <p>{getWeekDay()}</p>
        <p>{getDate()}</p>
        <p>
          +<strong>{t}°</strong>
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;
