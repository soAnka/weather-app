import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import thunder from "../../assets/thunder@2x.png";
import rain from "../../assets/rain@2x.png";
import sunny from "../../assets/sunny@2x.png";
import fog from "../../assets/fog@2x.png";
import cloudy from "../../assets/cloud@2x.png";
import snow from "../../assets/snow@2x.png";
import { IWeather } from "../../types/WeatherTypes";

interface WeatherState {
  weatherLocation: string | FormDataEntryValue | File;
  weather: IWeather;
  nightOrDay: string;
  weatherDescription: string;
  weatherImage: string;
  weatherOptions: {
    Thunderstorm: string;
    Drizzle: string;
    Rain: string;
    Snow: string;
    Mist: string;
    Haze: string;
    Smoke: string;
    Fog: string;
    Sand: string;
    Dust: string;
    Ash: string;
    Squall: string;
    Tornado: string;
    Clear: string;
    Clouds: string;
  };
}

const initialState: WeatherState = {
  weatherLocation: "Warszawa",
  weatherDescription: "Clouds",
  nightOrDay: "day",
  weatherImage: "",
  weatherOptions: {
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
  },
  weather: {
    coord: {
      lon: 0,
      lat: 0,
    },
    weather: [
      {
        id: 0,
        main: "",
        description: "",
        icon: "",
      },
    ],
    base: "",
    main: {
      temp: 0,
      pressure: 0,
      humidity: 0,
      temp_min: 0,
      temp_max: 0,
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
    },
    clouds: {
      all: 0,
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      message: 0,
      country: "",
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
    id: 0,
    name: "",
    cod: 0,
  },
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherCondition: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        weatherDescription: "Clouds",
        weather: action.payload,
      };
    },
    setNightOrDay: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        nightOrDay: action.payload,
      };
    },
    setCity: (
      state,
      action: PayloadAction<string | FormDataEntryValue | File>,
    ) => {
      return {
        ...state,
        weatherLocation: action.payload,
      };
    },
  },
});

export const { setWeatherCondition, setNightOrDay, setCity } =
  weatherSlice.actions;

export const selectWeather = (state: RootState) => state;

export default weatherSlice.reducer;
