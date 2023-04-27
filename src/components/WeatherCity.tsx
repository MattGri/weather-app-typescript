import React from 'react';

interface IWeather {
  temp: string;
  name: string;
  weatherIcon: string;
  sunrise: string;
  sunset: string;
  nameDel: string;
  handleWeatherDelete: (nameDel) => void;
}

const WeatherCity = ({
  temp,
  name,
  weatherIcon,
  sunrise,
  sunset,
  nameDel,
  handleWeatherDelete,
}: IWeather) => {
  return (
    <div key={nameDel}>
      <p className="temperature">Temperature: {temp}&#8451;</p>
      <p className="cityInformation">City: {name}</p>
      <p className="cityInformation">Sunrise: {sunrise}</p>
      <p className="cityInformation">Sunset: {sunset}</p>
      <img
        src={`https://www.weatherbit.io/static/img/icons/${weatherIcon}.png`}
        alt="weather Icon"
        className="weatherImage"
      />
      <button
        className="deleteButton"
        onClick={() => handleWeatherDelete(nameDel)}
      >
        delete
      </button>
    </div>
  );
};

export default WeatherCity;
