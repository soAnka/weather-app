import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import cloudy from './assets/cloud@2x.png'
import snow from './assets/snow@2x.png'
// import thunder from './assets/thunder@2x.png'
// import rain from './assets/rain@2x.png'
// import sunny from './assets/sunny@2x.png'
// import fog from './assets/fog@2x.png'
import drop from './assets/rain_drop.png'
// import pressure_icon from './assets/pressure_icon@2x.png'
// import rabbit from './assets/winter_rabbit@2x.png'
import { useMediaQuery } from 'react-responsive';
// import { BsMoonStars } from "react-icons/bs";
// import { MdOutlineWbSunny } from "react-icons/md";
// import { FaWind } from "react-icons/fa";
// import { IoSearch } from "react-icons/io5";
// import { WiHumidity } from "react-icons/wi";
import FormWeather from './FormWeather';
import WeatherResults from './WeatherResults';

function App() {
  const [weather, setWeather]=useState<any>(null)
  const [error, setError] = useState('')
  const [cityName, setCityName]=useState<FormDataEntryValue>('Zakopane')
  const windowSize = useRef([window.innerWidth, window.innerHeight])
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  useEffect(()=>{
    axios({
      method: "get",
      url: 'http://localhost:8080/weather',
      params: { cityName:cityName}
    }).then(response=>setWeather(response.data)).catch((e)=>{
      setError('Error')
      console.log(e)
    })
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
 
if(error) {
  return <p>{error}</p>
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
// const sunriseTime = getTime(sunrise)
const nowHour = new Date().getHours()
const NightOrDay = nowHour  >= +sunsetTime.substring(0,2) ? 'night':'day'
// const info_boxes = [
//   {
//     name: 'wschód',
//     value: <p>{sunriseTime}</p>,
//     icon: <MdOutlineWbSunny color="grey" fontSize={16}/>
//   },
//   {
//     name: 'zachód',
//     value: <p>{sunsetTime}</p>,
//     icon: <BsMoonStars color="grey" fontSize={16}/>
//   },
//   {
//     name: 'ciśnienie',
//     value: <div><img src={pressure_icon} className="pressure_icon" alt=""/><p>{pressure}hPa</p></div>,
//     icon: ''
//   },
// ]

// const weather_options={
//   'Thunderstorm': thunder,
//   'Drizzle': rain,
//   'Rain':rain,
//   'Snow': snow,
//   'Mist': rain,
//   'Haze': fog,
//   'Smoke': fog,
//   'Fog': fog,
//   'Sand': fog,
//   'Dust': fog,
//   'Ash': fog,
//   'Squall': fog,
//   'Tornado': cloudy,
//   'Clear': sunny,
//   'Clouds': cloudy,
// }
console.log(windowSize.current[1])
const anim = () => {
  const windowWd = windowSize.current[0];
  const windowHg = windowSize.current[1]
  const quantity = isDesktopOrLaptop ? 20 : 6;

  const getAnimationObject = () => {
    let obj_styles = {
      img: '',
      name: '',
      timing: 0,
      top:'',
      right:'',
    }
    switch(weather.weather[0].main) {
      case 'Snow':
        obj_styles = {...obj_styles, img:snow, name:'snow_falling', timing: 4.5}
        break;
      case 'Rain':
        obj_styles = {...obj_styles, img:drop, name:'raining', timing: 3}
        break;
      default:
        obj_styles = {...obj_styles, img:cloudy, name:'clouding', timing: 18};
        break;
    }
    return obj_styles;
  }
 return Array.from({length: quantity}, (_,i)=>i).map((i)=>{
  const randomNum = (description==='Snow'|| description==='Rain') ? Math.floor(Math.random() * windowWd) : Math.floor(Math.random() * windowHg)
  const delay=i/2 + Math.floor(Math.random()* 3)
  const animation_object = getAnimationObject()
  return <img className="animation_obj" src={animation_object.img} 
  style={{
    top: (description==='Snow'|| description==='Rain') ? '-20px': randomNum + 'px', 
    right: (description==='Snow'||description==='Rain') ? 0 + randomNum + 'px' :  '0px' , 
    width: description==='Clouds' ? '110px':'',
    height: description==='Clouds' ? 'auto':'',
    animationDelay:`${delay}s`, 
    animationName: animation_object.name, 
    animationDuration: `${animation_object.timing}s`}} alt=''/>
})
}
console.log(description)
  return (
    <div className={`App ${NightOrDay}`}>
      {isDesktopOrLaptop &&<div className="animation">
        {anim()}
      </div>}
      <FormWeather isDesktopOrLaptop={isDesktopOrLaptop} submitHandler={submitHandler}  />
      {/* {isDesktopOrLaptop && <form onSubmit={submitHandler}>
        <input className="search_input" name="city" type="text" placeholder="Wprowadź nazwę miasta"  />
        <button className="search_btn"><IoSearch color="white" fontSize={16}/></button>
        </form>} */}
      {
        weather !== null && weather !== undefined ? (    
          <div className={`weather_results ${isDesktopOrLaptop ? 'desktop': null} ${NightOrDay}`}>
              {!isDesktopOrLaptop && anim()}
              <WeatherResults weather={weather} />
              {/* <>
              <div className="weather_results--header">
              <div className="weather_results--header center">
              <p className="city_name">{weather.name}</p>
                <img className="weather_image" src={weather_options[description as keyof typeof weather_options] !== undefined ?weather_options[description as keyof typeof weather_options]:cloudy } alt="cloudy" />
                <p className="city_temperature">{Math.round(weather.main.temp )}&deg;</p>
                <p className="city_description">{weather.weather[0].description}</p>

              </div>
              <div className="weather_results--header bottom">
                <img className="winter_rabbit" src={rabbit} alt="winter rabbit"/>
                <div className="weather_results--header_box">
                  <div>
                    <WiHumidity color="white" fontSize={16}/>
                    <p>wilgotność</p>
                  </div>
                  <p>{humidity}%</p>
                </div>
                <div className="weather_results--header_box">
                  <div>
                  <FaWind color="white" fontSize={16}/><p>wiatr</p>
                  </div>
                  <p>{weather.wind.speed}m/sec</p>
                </div>
              </div>
            </div>
            <div className="weather_results--info">
              {info_boxes.map((box)=>{
                return (
                  <div key={box.name} className="box">
                  <div>
                    {box.icon}
                    <p className="box-name">{box.name}</p>
                  </div>
                  <p className="box-value">{box.value}</p>
                </div>
                )
              })}
              </div>
              </> */}
          </div>
        ):(
          <p>Sorry. We can't display weather. Try again later.</p>
          )
      }
    </div>
  );
}

export default App;
