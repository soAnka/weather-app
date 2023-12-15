import { IBox } from "../types/WeatherTypes";

const InfoBox = ({ name, value, icon }: IBox) => {
  return (
    <div className="box">
      <div>
        {icon}
        {name}
      </div>
      {value}
    </div>
  );
};

export default InfoBox;
