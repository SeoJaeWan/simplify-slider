import { SimplifySlide, SimplifySlider } from "simplify-slider/react";

function App() {
  return (
    <>
      <SimplifySlider
        options={{
          loop: true,
          drag: true,
          duration: 1000,
          autoplay: {
            enabled: true,
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

        <div>테스트</div>
        <div>테스트</div>
        <div>테스트</div>
      </SimplifySlider>
      <SimplifySlider
        options={{
          loop: true,
          drag: true,
          duration: 1000,
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

        <div>테스트</div>
        <div>테스트</div>
        <div>테스트</div>
      </SimplifySlider>
    </>
  );
}

export default App;
