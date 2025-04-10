import { Children, cloneElement, isValidElement, PropsWithChildren, ReactNode } from "react";
import SimplifySlide from "../simplifySlide";
import isComponentWithDisplayName from "../../utils/isComponentWithDisplayName";
import "./simplifySlider.css";

export interface SimplifySliderProps extends PropsWithChildren {
  children: ReactNode;
}

const SimplifySlider: React.FC<SimplifySliderProps> = (props) => {
  const { children } = props;
  const slides: ReactNode[] = [];
  const others: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (
      isValidElement(child) &&
      (child.type === SimplifySlide || isComponentWithDisplayName(child.type, "SimplifySlide"))
    ) {
      slides.push(child);
    } else {
      others.push(child);
    }
  });

  return (
    <div className={"simplify-slider"}>
      <div className={"wrapper"}>
        <ol className={"list"}>
          {slides.map((slide, index) => (isValidElement(slide) ? cloneElement(slide, { key: index }) : slide))}
        </ol>
      </div>

      {others.map((other, index) => (isValidElement(other) ? cloneElement(other, { key: index }) : other))}
    </div>
  );
};

export default SimplifySlider;
