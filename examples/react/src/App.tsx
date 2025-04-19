import { SimplifySlide, SimplifySlider, useSimplifySlide } from "simplify-slider/react";

function App() {
  const { core, next, prev, goTo } = useSimplifySlide();

  return (
    <SimplifySlider
      ref={core}
      options={{
        loop: true,
        drag: true,
        duration: 1000,
        autoplay: {
          interval: 1000,
          direction: "right",
          rolling: false,
          onProgress: () => {},
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

      <button onClick={prev}>이전</button>
      <button onClick={next}>다음</button>

      <div>
        <li>
          <button onClick={() => goTo(1)}>1</button>
        </li>
        <li>
          <button onClick={() => goTo(2)}>2</button>
        </li>
        <li>
          <button onClick={() => goTo(3)}>3</button>
        </li>
      </div>
    </SimplifySlider>
  );
}

export default App;
