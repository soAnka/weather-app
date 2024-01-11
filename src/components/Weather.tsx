import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import FormWeather from "./FormWeather";
import WeatherResults from "./WeatherResults";
import { getTime } from "./methods/getTime";
import { anim } from "./methods/getAnimation";
import { RootState, store } from "../store/store";
import {
  setNightOrDay,
  setWeatherCondition,
} from "../store/features/weatherSlice";
import { IWeather } from "../types/WeatherTypes";
import { useDispatch, useSelector } from "react-redux";

const Weather = () => {
  const dispatch = useDispatch();

  const cityName = useSelector<RootState, string | FormDataEntryValue | File>(
    (state) => state.weatherLocation,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "http://localhost:8080/",
      params: { cityName: cityName },
    })
      .then((response) => {
        const data = response.data;
        store.dispatch(setWeatherCondition(data));
        const { sunset } = response.data.sys;
        const sunsetTime = getTime(sunset);
        const nowHour = new Date().getHours();
        const dayNight =
          nowHour >= +sunsetTime.substring(0, 2) ? "night" : "day";
        store.dispatch(setNightOrDay(dayNight));
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
    setLoading(false);
  }, [cityName, dispatch]);

  const nightOrDay = useSelector<RootState, string>(
    (state) => state.nightOrDay,
  );
  const weather = useSelector<RootState, IWeather>((state) => state.weather);
  const weatherDescription = useSelector<RootState, string>(
    (state) => state.weatherDescription,
  );

  const renderAnimation = anim(
    weatherDescription,
    isDesktopOrLaptop,
    windowSize,
  );

  if (error) {
    return <p>Something went wrong.{error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className={`App ${nightOrDay}`}>
      {isDesktopOrLaptop && <div className="animation">{renderAnimation} </div>}
      <FormWeather />
      <div
        className={`weather_results ${
          isDesktopOrLaptop ? "desktop" : null
        } ${nightOrDay}`}
      >
        {!error && weather !== undefined && (
          <WeatherResults
            weather={weather}
            isDesktopOrLaptop={isDesktopOrLaptop}
            renderAnimation={renderAnimation}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default Weather;
