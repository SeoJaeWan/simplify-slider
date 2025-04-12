import { Children, cloneElement, isValidElement } from "react";
import type { ReactNode, PropsWithChildren, ReactElement } from "react";
import SimplifySlide from "../simplifySlide";
import "./simplifySlider.css";

export interface SimplifySliderProps extends PropsWithChildren {
  children: ReactNode;
}

const SimplifySlider: React.FC<SimplifySliderProps> = (props) => {
  const { children } = props;
  const slides: ReactElement[] = [];
  const others: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === SimplifySlide) {
      slides.push(child);
    } else {
      others.push(child);
    }
  });

  return (
    <div className={"simplify-slider"}>
      <div className={"wrapper"}>
        <ol className={"list"}>{slides.map((slide, index) => cloneElement(slide, { key: index }))}</ol>
      </div>

      {others.map((other, index) => (isValidElement(other) ? cloneElement(other, { key: index }) : other))}
    </div>
  );
};

export default SimplifySlider;
