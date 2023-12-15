import rabbit from "../assets/winter_rabbit@2x.png";
import cloudy from "../assets/cloud@2x.png";
import InfoBox from "./InfoBox";
import { HeaderResultsProps } from "../types/WeatherTypes";

const HeaderResults = ({
  weather_options,
  weather_name,
  temperature,
  main_description,
  city,
  info,
}: HeaderResultsProps) => {
  return (
    <div className="weather_results--header">
      <div className="weather_results--header top">
        <p className="city_name">{weather_name}</p>
        <img
          className="weather_image"
          src={
            weather_options[
              main_description as keyof typeof weather_options
            ] !== undefined
              ? weather_options[
                  main_description as keyof typeof weather_options
                ]
              : cloudy
          }
          alt="cloudy"
        />
        <p className="weather_temperature">{Math.round(temperature)}&deg;</p>
        <p className="weather_description">{city}</p>
      </div>
      <div className="weather_results--header bottom">
        <img className="winter_rabbit" src={rabbit} alt="winter rabbit" />
        {info.map((box) => {
          return <InfoBox key={box.id} {...box} />;
        })}
      </div>
    </div>
  );
};

export default HeaderResults;
