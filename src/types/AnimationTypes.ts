export type AnimationItemProps = {
  weatherCondition: string;
  animation_object: {
    img: string;
    name: string;
    timing: number;
    top: string;
    right: string;
  };
  randomNum: number;
  delay: number;
};
