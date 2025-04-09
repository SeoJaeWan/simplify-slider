import { PropsWithChildren } from "react";
import SimplifySlide from "./components/simplifySlide";
export interface SimplifySliderProps extends PropsWithChildren {
  children: React.ReactNode;
}

const SimplifySlider: React.FC<SimplifySliderProps> = (props) => {
  const { children } = props;

  return <div>{children}</div>;
};

export { SimplifySlider, SimplifySlide };
