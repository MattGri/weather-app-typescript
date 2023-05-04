import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { firestore } from './config/firebase-config';
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import './styles/app.scss';
import WeatherCity from './components/WeatherCity';

interface WeatherData {
  name: string;
  temp: string;
  weatherIcon: string;
  sunrise: string;
  sunset: string;
  id: string;
}

function App() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city === '') {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    setLoading(true);
    const weatherCollection = collection(firestore, 'weather');
    axios
      .get(
        `https://api.weatherbit.io/v2.0/current?city=${city}&key=ede536b748804642b1484256e8d798ff&include=minutely`
      )
      .then((res) => {
        setLoading(false);
        const citys = {
          name: res.data.data[0].city_name,
          temp: res.data.data[0].temp,
          weatherIcon: res.data.data[0].weather.icon,
          sunrise: res.data.data[0].sunrise,
          sunset: res.data.data[0].sunset,
        };
        addDoc(weatherCollection, citys);
      });
    setCity('');
  };

  useEffect(() => {
    document.title = 'Weather App';

    const weatherCollection = collection(firestore, 'weather');
    onSnapshot(weatherCollection, (snapshot) => {
      setWeatherData(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            temp: data.temp,
            weatherIcon: data.weatherIcon,
            sunrise: data.sunrise,
            sunset: data.sunset,
          };
        })
      );
    });
  }, []);

  const handleWeatherDelete = (id: string) => {
    const weatherRef = doc(firestore, 'weather', id);
    deleteDoc(weatherRef);
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleFormSubmit} className="submit">
          <label className="cityLabel">Type City: </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search..."
            className="cityInput"
          />
          <button className="search">Submit</button>
        </form>

        {error && <p className="cityError">Enter a city</p>}
        {loading && <p className="cityLoading">Loading...</p>}

        {weatherData.map(({ temp, name, weatherIcon, sunrise, sunset, id }) => {
          return (
            <WeatherCity
              key={id}
              temp={temp}
              name={name}
              weatherIcon={weatherIcon}
              sunrise={sunrise}
              sunset={sunset}
              nameDel={id}
              handleWeatherDelete={() => handleWeatherDelete(id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
