import { Children, cloneElement, forwardRef, isValidElement, useEffect, useRef } from "react";
import SimplifySlide from "../simplifySlide";
import "../../../css/simplifySlider.css";
import Core from "../../../script/core";
import type { ReactNode, PropsWithChildren, ReactElement } from "react";
import type { ScrollOptions } from "../../../types/scroll.types";

interface SimplifySliderProps extends PropsWithChildren {
  options?: ScrollOptions;
}

/**
 * SimplifySlider is a React component that provides simple slider functionality.
 *
 * @component
 * @param {ReactNode} children - The slides and other elements to be rendered inside the slider.
 * @param {ScrollOptions} [options] - The options for configuring the slider behavior. (optional)
 * @param {Ref<Core>} ref - A reference to the Core instance for controlling the slider programmatically.
 */
const SimplifySlider = forwardRef<Core, SimplifySliderProps>((props, ref) => {
  const { children, options } = props;
  const slides: ReactElement[] = [];
  const others: ReactNode[] = [];
  const wrapperSlideRef = useRef<HTMLOListElement>(null);
  const simplifyCore = useRef<Core>(null);

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === SimplifySlide) {
      slides.push(child);
    } else {
      others.push(child);
    }
  });

  useEffect(() => {
    const wrapper = wrapperSlideRef.current;

    if (wrapper && !simplifyCore.current) {
      const core = new Core(wrapper, slides.length, options);
      simplifyCore.current = core;
      if (ref && typeof ref !== "function") ref.current = core;
    }
  }, [slides.length, options]);

  return (
    <div className={"simplify-slider"}>
      <div className={"wrapper"}>
        <ol className={"list"} ref={wrapperSlideRef}>
          {slides.map((slide, index) => cloneElement(slide, { key: index }))}
        </ol>
      </div>

      {others.map((other, index) => (isValidElement(other) ? cloneElement(other, { key: index }) : other))}
    </div>
  );
});

export default SimplifySlider;
