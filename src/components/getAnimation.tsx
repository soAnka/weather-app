import cloudy from "../assets/cloud@2x.png";
import snow from "../assets/snow@2x.png";
import drop from "../assets/rain_drop.png";
import { AnimationItemProps } from "../types/AnimationTypes";

export const getAnimationObject = (weatherCondition: string) => {
  let obj_styles = {
    img: "",
    name: "",
    timing: 0,
    top: "",
    right: "",
  };
  switch (weatherCondition) {
    case "Snow":
      obj_styles = {
        ...obj_styles,
        img: snow,
        name: "snow_falling",
        timing: 5.5,
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

export const anim = (
  weatherCondition: string,
  isDesktopOrLaptop: boolean,
  windowSize: any,
) => {
  const windowWd = windowSize.current[0];
  const windowHg = windowSize.current[1];
  const quantity = isDesktopOrLaptop ? 20 : 6;

  return Array.from({ length: quantity }, (_, i) => i).map((i) => {
    const randomNum =
      weatherCondition === "Snow" || weatherCondition === "Rain"
        ? Math.floor(Math.random() * windowWd)
        : Math.floor(Math.random() * windowHg);
    const delay = i / 2 + Math.floor(Math.random() * 3);
    const animation_object = getAnimationObject(weatherCondition);
    return (
      <AnimItem
        key={i}
        animation_object={animation_object}
        weatherCondition={weatherCondition}
        randomNum={randomNum}
        delay={delay}
      />
    );
  });
};

export const AnimItem = ({
  animation_object,
  weatherCondition,
  randomNum,
  delay,
}: AnimationItemProps) => {
  return (
    <img
      className="animation_obj"
      src={animation_object.img}
      style={{
        top:
          weatherCondition === "Snow" || weatherCondition === "Rain"
            ? "-20px"
            : randomNum + "px",
        right:
          weatherCondition === "Snow" || weatherCondition === "Rain"
            ? 0 + randomNum + "px"
            : "-110px",
        width: weatherCondition === "Clouds" ? "110px" : "",
        height: weatherCondition === "Clouds" ? "auto" : "",
        animationDelay: `${delay}s`,
        animationName: animation_object.name,
        animationDuration: `${animation_object.timing}s`,
      }}
      alt=""
    />
  );
};
