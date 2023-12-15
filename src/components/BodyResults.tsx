import { BodyResultsProps } from "../types/WeatherTypes";
import InfoBox from "./InfoBox";

const BodyResults = ({ info }: BodyResultsProps) => {
  return (
    <div className="weather_results--body">
      {info.map((box) => {
        return <InfoBox key={box.id} {...box} />;
      })}
    </div>
  );
};

export default BodyResults;
