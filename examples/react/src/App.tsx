import { useRef } from "react";
import { SimplifySlide, SimplifySlider } from "simplify-slider/react";
import type { Simplify } from "simplify-slider/react";

function App() {
  const slide = useRef<Simplify>(null);

  const handleNext = () => {
    if (slide.current) {
      slide.current.next();
    }
  };

  const handlePrev = () => {
    if (slide.current) {
      slide.current.prev();
    }
  };

  const handleGoTo = (index: number) => {
    if (slide.current) {
      slide.current.goTo(index);
    }
  };

  return (
    <SimplifySlider
      ref={slide}
      options={{
        loop: true,
        drag: true,
        duration: 1000,
        autoplay: {
          enabled: false,
          interval: 1000,
          direction: "right",
        },
      }}
    >
      <SimplifySlide>
        <div style={{ height: "200px" }}>1</div>
      </SimplifySlide>
      <SimplifySlide>
        <div style={{ height: "200px" }}>2</div>
      </SimplifySlide>
      <SimplifySlide>
        <div style={{ height: "200px" }}>3</div>
      </SimplifySlide>

      <button onClick={handlePrev}>이전</button>
      <button onClick={handleNext}>다음</button>

      <div>
        <li>
          <button onClick={() => handleGoTo(1)}>1</button>
          <button onClick={() => handleGoTo(2)}>2</button>
          <button onClick={() => handleGoTo(3)}>3</button>
        </li>
      </div>
    </SimplifySlider>
  );
}

export default App;
