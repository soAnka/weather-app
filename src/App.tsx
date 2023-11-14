import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [weather, setWeather]=useState<any>(null)
  useEffect(()=>{
    axios({
      method: "get",
      url: 'http://localhost:8080/weather'
    }).then(response=>setWeather(response.data)).catch(()=>console.log("something went wrong"))
  },[])

  return (
    <div className="App">
      <header className="App-header">
      <h3>Weather App</h3>
      {
        weather !== null && weather !== undefined ? (    
          <div className='weather_results'>
            <p>City: {weather.city.name}</p>
          </div>
        ):(
          <p>Choose city</p>
        )
      }
      </header>
    </div>
  );
}

export default App;
