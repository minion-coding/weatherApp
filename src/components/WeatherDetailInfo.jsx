function WeatherDetailInfo({ w, t }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center w-4/5 gap-5">
        <img className="flex-50" src={`./src/assets/${w}.png`} />
        <p className="flex-50 font-extralight text-7xl">
          <strong id="main-temp">{t}°</strong>
        </p>
      </div>
      <p className="text-center font-light text-2xl">{w}</p>
    </div>
  );
}

export default WeatherDetailInfo;
