import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import cloudy from "./assets/cloud@2x.png";
import snow from "./assets/snow@2x.png";
import drop from "./assets/rain_drop.png";
import { useMediaQuery } from "react-responsive";
import FormWeather from "./components/FormWeather";
import WeatherResults from "./components/WeatherResults";

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
        console.log(e);
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
  const getTime = (sun: any) => {
    const sunTime = new Date(sun * 1000);
    const finTime =
      (sunTime.getHours() < 10 ? "0" : "") +
      sunTime.getHours() +
      ":" +
      (sunTime.getMinutes() < 10 ? "0" : "") +
      sunTime.getMinutes();
    return finTime;
  };
  const description = weather.weather[0].main;
  const { sunset } = weather.sys;
  const sunsetTime = getTime(sunset);
  const nowHour = new Date().getHours();
  const NightOrDay = nowHour >= +sunsetTime.substring(0, 2) ? "night" : "day";
  const anim = () => {
    const windowWd = windowSize.current[0];
    const windowHg = windowSize.current[1];
    const quantity = isDesktopOrLaptop ? 20 : 6;

    const getAnimationObject = () => {
      let obj_styles = {
        img: "",
        name: "",
        timing: 0,
        top: "",
        right: "",
      };
      switch (weather.weather[0].main) {
        case "Snow":
          obj_styles = {
            ...obj_styles,
            img: snow,
            name: "snow_falling",
            timing: 4.5,
          };
          break;
        case "Rain":
          obj_styles = { ...obj_styles, img: drop, name: "raining", timing: 3 };
          break;
        default:
          obj_styles = {
            ...obj_styles,
            img: cloudy,
            name: "clouding",
            timing: 18,
          };
          break;
      }
      return obj_styles;
    };
    return Array.from({ length: quantity }, (_, i) => i).map((i) => {
      const randomNum =
        description === "Snow" || description === "Rain"
          ? Math.floor(Math.random() * windowWd)
          : Math.floor(Math.random() * windowHg);
      const delay = i / 2 + Math.floor(Math.random() * 3);
      const animation_object = getAnimationObject();
      return (
        <img
          className="animation_obj"
          src={animation_object.img}
          style={{
            top:
              description === "Snow" || description === "Rain"
                ? "-20px"
                : randomNum + "px",
            right:
              description === "Snow" || description === "Rain"
                ? 0 + randomNum + "px"
                : "0px",
            width: description === "Clouds" ? "110px" : "",
            height: description === "Clouds" ? "auto" : "",
            animationDelay: `${delay}s`,
            animationName: animation_object.name,
            animationDuration: `${animation_object.timing}s`,
          }}
          alt=""
        />
      );
    });
  };
  console.log(description);
  return (
    <div className={`App ${NightOrDay}`}>
      {isDesktopOrLaptop && <div className="animation">{anim()}</div>}
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
          {!isDesktopOrLaptop && anim()}
          <WeatherResults weather={weather} />
        </div>
      ) : (
        <p>Sorry. We can't display weather. Try again later.</p>
      )}
    </div>
  );
}

export default App;
