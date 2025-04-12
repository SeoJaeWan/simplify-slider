import { Children, cloneElement, isValidElement, useEffect, useRef } from "react";
import type { ReactNode, PropsWithChildren, ReactElement } from "react";
import SimplifySlide from "../simplifySlide";
import "./simplifySlider.css";
import MoveScroll from "../../../core/moveScroll";
import { MoveScrollOptions } from "../../../types/moveScroll.types";

interface SimplifySliderProps extends PropsWithChildren {
  options?: MoveScrollOptions;
}

/**
 * SimplifySlider is a React component that provides simple slider functionality.
 *
 * @component
 * @param {ReactNode} children - The slides and other elements to be rendered inside the slider.
 * @param {MoveScrollOptions} options - The options for configuring the slider behavior.
 */
const SimplifySlider: React.FC<SimplifySliderProps> = (props) => {
  const { children, options } = props;
  const slides: ReactElement[] = [];
  const others: ReactNode[] = [];
  const wrapperSlideRef = useRef<HTMLOListElement>(null);
  const simplifyCore = useRef<MoveScroll>(null);

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === SimplifySlide) {
      slides.push(child);
    } else {
      others.push(child);
    }
  });

  const handleClickNext = () => {
    if (simplifyCore.current) {
      simplifyCore.current.next();
    }
  };

  const handleClickPrev = () => {
    if (simplifyCore.current) {
      simplifyCore.current.prev();
    }
  };

  useEffect(() => {
    const wrapper = wrapperSlideRef.current;

    if (wrapper) {
      simplifyCore.current = new MoveScroll(wrapper, slides.length, options);
    }
  }, [slides.length, options]);

  return (
    <div className={"simplify-slider"}>
      <div className={"wrapper"}>
        <ol className={"list"} ref={wrapperSlideRef}>
          {slides.map((slide, index) => cloneElement(slide, { key: index }))}
        </ol>
      </div>

      <button onClick={handleClickPrev}>이전</button>
      <button onClick={handleClickNext}>이후</button>

      {others.map((other, index) => (isValidElement(other) ? cloneElement(other, { key: index }) : other))}
    </div>
  );
};

export default SimplifySlider;
