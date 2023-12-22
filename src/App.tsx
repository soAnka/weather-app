import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import FormWeather from "./components/FormWeather";
import WeatherResults from "./components/WeatherResults";
import { getTime } from "./components/getTime";
import { anim } from "./components/getAnimation";

function App() {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");
  const [cityName, setCityName] = useState<FormDataEntryValue>("Zakopane");
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/weather",
      params: { cityName: cityName },
    })
      .then((response) => setWeather(response.data))
      .catch((e) => {
        setError("Error");
      });
  }, [cityName]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const city = formData.get("city");
    if (city !== "" && city !== null) {
      setCityName(city);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }
  if (!weather) {
    return <p>Sorry. We can't display weather. Try again later.</p>;
  }

  const description = weather.weather[0].main;
  const { sunset } = weather.sys;
  const sunsetTime = getTime(sunset);
  const nowHour = new Date().getHours();
  const NightOrDay = nowHour >= +sunsetTime.substring(0, 2) ? "night" : "day";

  const renderAnimation = anim(description, isDesktopOrLaptop, windowSize);

  return (
    <div className={`App ${NightOrDay}`}>
      {isDesktopOrLaptop && <div className="animation">{renderAnimation} </div>}
      <FormWeather
        isDesktopOrLaptop={isDesktopOrLaptop}
        submitHandler={submitHandler}
      />
      {weather !== null && weather !== undefined ? (
        <div
          className={`weather_results ${
            isDesktopOrLaptop ? "desktop" : null
          } ${NightOrDay}`}
        >
          <WeatherResults
            weather={weather}
            isDesktopOrLaptop={isDesktopOrLaptop}
            renderAnimation={renderAnimation}
          />
        </div>
      ) : (
        <p>Sorry. We can't display weather. Try again later.</p>
      )}
    </div>
  );
}

export default App;
