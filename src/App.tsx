import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import cloudy from './assets/cloud.png'
import snow from './assets/snow.png'
import thunder from './assets/thunder.png'
import rain from './assets/rain.png'
import sunny from './assets/sunny.png'
import fog from './assets/fog.png'
import { useMediaQuery } from 'react-responsive';
import { BsMoonStars } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";

function App() {
  const [weather, setWeather]=useState<any>(null)
  const [cityName, setCityName]=useState<FormDataEntryValue>('London')
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
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
const getTime=(sun:any) => {
  const sunTime = new Date(sun * 1000)
  const finTime =(sunTime.getHours() < 10 ? '0' : '') + sunTime.getHours() + ':' + (sunTime.getMinutes() < 10 ? '0' : '') + sunTime.getMinutes()
  return finTime;
}
const { humidity, pressure } = weather.main;
const description=weather.weather[0].main
const {sunset, sunrise}=weather.sys
const sunsetTime = getTime(sunset)
const sunriseTime = getTime(sunrise)
const nowHour = new Date().getHours()
const NightOrDay = nowHour  >= +sunsetTime.substring(0,2) ? 'night':'day'

const info_boxes = [
  {
    name: 'wschód',
    value: <p>{sunriseTime}</p>,
    icon: <MdOutlineWbSunny color="white" fontSize={16}/>
  },
  {
    name: 'zachód',
    value: <p>{sunsetTime}</p>,
    icon: <BsMoonStars color="white" fontSize={16}/>
  }
]
const weather_options={
  'Thunderstorm': thunder,
  'Drizzle': rain,
  'Rain':rain,
  'Snow': snow,
  'Mist': rain,
  'Haze': fog,
  'Smoke': fog,
  'Fog': fog,
  'Sand': fog,
  'Dust': fog,
  'Ash': fog,
  'Squall': fog,
  'Tornado': cloudy,
  'Clear': sunny,
  'Clouds': cloudy,
}

  return (
    <div className={`App ${NightOrDay}`}>
      {isDesktopOrLaptop && <form onSubmit={submitHandler}>
        <input className="search_input" name="city" type="text" placeholder="Provide city"  />
        <button className="search_btn"><IoSearch color="white" fontSize={16}/></button>
        </form>}
      {
        weather !== null && weather !== undefined ? (    
          <div className={`weather_results ${isDesktopOrLaptop ? 'desktop': null} ${NightOrDay}`}>
            <div className="weather_results--header">
              <div className="weather_results--header center">
              <p className="city_name">{weather.name}</p>
                <img className="weather_image" src={weather_options[description as keyof typeof weather_options] !== undefined ?weather_options[description as keyof typeof weather_options]:cloudy } alt="cloudy" />
                <p className="city_temperature">{Math.round(weather.main.temp )}&deg;</p>
                <p className="city_description">{weather.weather[0].description}</p>

              </div>
              <div className="weather_results--header bottom">
                <div>
                <WiHumidity color="white" fontSize={24}/>
                  <p>wilgotność</p>
                  <p>{humidity}%</p>
                </div>
                <div>
                  <FaWind color="white" fontSize={16}/><p>wiatr</p>
                  <p>{weather.wind.speed}m/sec</p>
                </div>
              </div>
            </div>
            <div className="weather_results--info">
              {info_boxes.map((box)=>{
                return (
                  <div key={box.name} className="box">
                    {box.icon}
                  <p>{box.name}</p>
                  {box.value}
                </div>
                )
              })}
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
