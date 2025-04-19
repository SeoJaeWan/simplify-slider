import { SimplifySlide, SimplifySlider, useSimplifySlide } from "@simplify-slider/react";

function App() {
  const { core, next, prev, goTo } = useSimplifySlide();

  return (
    <div style={{ width: "1000px" }}>
      <SimplifySlider
        ref={core}
        options={{
          spaceBetween: 20,
          slidesPerView: 4,
          loop: true,
          drag: true,
        }}
      >
        <SimplifySlide>
          <div style={{ height: "200px", background: "red" }}>1</div>
        </SimplifySlide>
        <SimplifySlide>
          <div style={{ height: "200px", background: "blue" }}>2</div>
        </SimplifySlide>
        <SimplifySlide>
          <div style={{ height: "200px", background: "green" }}>3</div>
        </SimplifySlide>
        <SimplifySlide>
          <div style={{ height: "200px", background: "pink" }}>4</div>
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
    </div>
  );
}

export default App;
