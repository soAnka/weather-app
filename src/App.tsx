import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import cloudy from './cloud.png'
import humidity_ico from './humidity.png'

function App() {
  const [weather, setWeather]=useState<any>(null)
  const [cityName, setCityName]=useState<FormDataEntryValue>('London')

  useEffect(()=>{
    axios({
      method: "get",
      url: 'http://localhost:8080/weather',
      params: { cityName:cityName}
    }).then(response=>setWeather(response.data)).catch(()=>console.log("something went wrong"))
  },[cityName])
  const submitHandler =(event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const city = formData.get('city')
      if(city!=='' && city !== null) {
        setCityName(city)
      }
  }
 
if(!weather) {
  return <p>Sorry. We can't display weather. Try again later.</p>
}
const {humidity, pressure } = weather.main;

  return (
    <div className="App">
      <h4>WEATHER APP</h4>
      <form onSubmit={submitHandler}>
        <input className="search_input" name="city" type="text" placeholder="Provide city"  />
        <button>s</button>
        </form>
      {
        weather !== null && weather !== undefined ? (    
          <div className='weather_results'>
            <div className="weather_results--header">
                <p className="city_name">{weather.name}</p>
                <img src={cloudy} alt="cloudy" />
                <p className="city_temperature">{Math.round(weather.main.temp )}&deg;</p>
                <p className="city_description">{weather.weather[0].description}</p>
            </div>
            <div className="weather_results--info">
                <div className="box">
                  <p><img className="ico" alt="humidity icon" src={humidity_ico} />wilgotność</p>
                  <p>{humidity}%</p>
                </div>
                <div className="box">
                  <p>ciśnienie</p>
                  <p>{pressure} hPa</p>
                </div>
                <div className="box">
                  <p>ciśnienie</p>
                  <p>{pressure} hPa</p>
                </div>
                <div className="box">
                  <p>ciśnienie</p>
                  <p>{pressure} hPa</p>
                </div>
              </div>
          </div>
        ):(
          <p>Sorry. We can't display weather. Try again later.</p>
          )
      }
    </div>
  );
}

export default App;
