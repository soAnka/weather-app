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
import rabbit from "../assets/winter_rabbit@2x.png";
import { WeatherResultsProps } from "../types/WeatherTypes";

const WeatherResults = ({ weather }: WeatherResultsProps) => {
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
  const { humidity, pressure } = weather.main;
  const description = weather.weather[0].main;
  const { sunset, sunrise } = weather.sys;
  const sunsetTime = getTime(sunset);
  const sunriseTime = getTime(sunrise);

  const info_boxes = [
    {
      name: "wschód",
      value: <p>{sunriseTime}</p>,
      icon: <MdOutlineWbSunny color="grey" fontSize={16} />,
    },
    {
      name: "zachód",
      value: <p>{sunsetTime}</p>,
      icon: <BsMoonStars color="grey" fontSize={16} />,
    },
    {
      name: "ciśnienie",
      value: (
        <div>
          <img src={pressure_icon} className="pressure_icon" alt="" />
          <p>{pressure}hPa</p>
        </div>
      ),
      icon: "",
    },
  ];
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
      <div className="weather_results--header">
        <div className="weather_results--header center">
          <p className="city_name">{weather.name}</p>
          <img
            className="weather_image"
            src={
              weather_options[description as keyof typeof weather_options] !==
              undefined
                ? weather_options[description as keyof typeof weather_options]
                : cloudy
            }
            alt="cloudy"
          />
          <p className="city_temperature">
            {Math.round(weather.main.temp)}&deg;
          </p>
          <p className="city_description">{weather.weather[0].description}</p>
        </div>
        <div className="weather_results--header bottom">
          <img className="winter_rabbit" src={rabbit} alt="winter rabbit" />
          <div className="weather_results--header_box">
            <div>
              <WiHumidity color="white" fontSize={16} />
              <p>wilgotność</p>
            </div>
            <p>{humidity}%</p>
          </div>
          <div className="weather_results--header_box">
            <div>
              <FaWind color="white" fontSize={16} />
              <p>wiatr</p>
            </div>
            <p>{weather.wind.speed}m/sec</p>
          </div>
        </div>
      </div>
      <div className="weather_results--info">
        {info_boxes.map((box) => {
          return (
            <div key={box.name} className="box">
              <div>
                {box.icon}
                <p className="box-name">{box.name}</p>
              </div>
              <p className="box-value">{box.value}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WeatherResults;
