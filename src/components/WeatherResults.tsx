import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { BsMoonStars } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import thunder from "../assets/thunder@2x.png";
import rain from "../assets/rain@2x.png";
import sunny from "../assets/sunny@2x.png";
import fog from "../assets/fog@2x.png";
import cloudy from "../assets/cloud@2x.png";
import snow from "../assets/snow@2x.png";
import pressure_icon from "../assets/pressure_icon@2x.png";
import { WeatherResultsProps } from "../types/WeatherTypes";
import HeaderResults from "./HeaderResults";
import BodyResults from "./BodyResults";
import moment from "moment";

const WeatherResults = ({ weather }: WeatherResultsProps) => {
  const { humidity, pressure } = weather.main;
  const { sunset, sunrise } = weather.sys;
  const main_description = weather.weather[0].main;

  const convertTime = (sun: any, timezone: number) => {
    let sunTime = moment
      .unix(sun)
      .utcOffset(timezone / 60)
      .format("HH:MM");

    return sunTime;
  };

  const sunsetTime = convertTime(sunset, weather.timezone);
  const sunriseTime = convertTime(sunrise, weather.timezone);

  const info_boxes = {
    top: [
      {
        id: 1,
        name: <p className="box-name">wilgotność</p>,
        value: <p className="box-value">{humidity}%</p>,
        icon: <WiHumidity color="white" fontSize={16} />,
      },
      {
        id: 2,
        name: <p className="box-name">wiatr</p>,
        value: (
          <p className="box-value">
            {Math.ceil(weather.wind.speed * 3.6)} km/h
          </p>
        ),
        icon: <FaWind color="white" fontSize={16} />,
      },
    ],
    bottom: [
      {
        id: 3,
        name: <p className="box-name">wschód</p>,
        value: <p className="box-value">{sunriseTime}</p>,
        icon: <MdOutlineWbSunny color="grey" fontSize={16} />,
      },
      {
        id: 4,
        name: <p className="box-name">zachód</p>,
        value: <p className="box-value">{sunsetTime}</p>,
        icon: <BsMoonStars color="grey" fontSize={16} />,
      },
      {
        id: 5,
        name: <p className="box-name">ciśnienie</p>,
        value: (
          <div>
            <img src={pressure_icon} className="pressure_icon" alt="" />
            <p className="box-value">{pressure}hPa</p>
          </div>
        ),
        icon: "",
      },
    ],
  };

  const weather_options = {
    Thunderstorm: thunder,
    Drizzle: rain,
    Rain: rain,
    Snow: snow,
    Mist: rain,
    Haze: fog,
    Smoke: fog,
    Fog: fog,
    Sand: fog,
    Dust: fog,
    Ash: fog,
    Squall: fog,
    Tornado: cloudy,
    Clear: sunny,
    Clouds: cloudy,
  };

  return (
    <>
      <HeaderResults
        weather_options={weather_options}
        weather_name={weather.name}
        temperature={weather.main.temp}
        main_description={main_description}
        city={weather.weather[0].description}
        info={info_boxes.top}
      />
      <BodyResults info={info_boxes.bottom} />
    </>
  );
};

export default WeatherResults;
