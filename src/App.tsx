import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { firestore } from '../src/firebase-config'
import { addDoc, collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import './styles/app.scss';


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>([]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city === '') {
      return alert('Please enter a city');
    }

    const weatherCollection = collection(firestore, 'weather');
    axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=ede536b748804642b1484256e8d798ff&include=minutely`)
      .then(res => {
        const citys = {
          name: res.data.data[0].city_name,
          temp: res.data.data[0].temp,
          weatherIcon: res.data.data[0].weather.icon,
          sunrise: res.data.data[0].sunrise,
          sunset: res.data.data[0].sunset,
        }
        addDoc(weatherCollection, citys);
      }
      )
    setWeather([...weather, city]);

    setCity('');
  }

  useEffect(() => {
    document.title = 'Weather App';

    const weatherCollection = collection(firestore, 'weather');
    onSnapshot(weatherCollection, snapshot => {
      setWeather(snapshot.docs.map(doc => {
        return {
          nameDel: doc.id,
          ...doc.data()
        }
      }));
    })


  }, []);

  const deleteWeather = (id: string) => {
    const weatherRef = doc(firestore, 'weather', id);
    deleteDoc(weatherRef)
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      })

  }


  return (
    <div className="App">
      <div className='container'>
        <form onSubmit={submitHandler} className='submit'>
          <label className='cityLabel'>Type City: </label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Search..." className='cityInput' />
          <button className='search'>Submit</button>
        </form>

        {weather.map(({ temp, name, weatherIcon, sunrise, sunset, nameDel }, index) => {
          return (
            <div key={index}>
              <p className='temperature'>Temperature: {temp}&#8451;</p>
              <p className='cityInformation'>City: {name}</p>
              <p className='cityInformation'>Sunrise: {sunrise}</p>
              <p className='cityInformation'>Sunset: {sunset}</p>
              <img src={`https://www.weatherbit.io/static/img/icons/${weatherIcon}.png`} alt='' className='weatherImage' />
              <button className='deleteButton' onClick={() => deleteWeather(nameDel)}>delete</button>
            </div>
          )
        }
        )}
      </div>
    </div>
  );
}

export default App;
