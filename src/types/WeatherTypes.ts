import { ReactNode } from "react";

export interface IBox {
  id: number;
  name: ReactNode | React.ReactElement;
  value: ReactNode;
  icon: React.ReactElement | ReactNode;
}

type IWeatherOptions =
  | "Thunderstorm"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Mist"
  | "Haze"
  | "Smoke"
  | "Fog"
  | "Sand"
  | "Dust"
  | "Ash"
  | "Squall"
  | "Tornado"
  | "Clear"
  | "Clouds";

export type HeaderResultsProps = {
  weather_options: {
    [key in IWeatherOptions]: string;
  };
  weather_name: string;
  temperature: number;
  main_description: string;
  city: string;
  info: IBox[];
  isDesktopOrLaptop: boolean;
  renderAnimation: any;
};

export type BodyResultsProps = {
  info: IBox[];
};

export interface IWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  base: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export type WeatherResultsProps = {
  weather: IWeather;
  isDesktopOrLaptop: boolean;
  renderAnimation: any;
};
