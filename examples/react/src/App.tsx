import { SimplifySlide, SimplifySlider } from "simplify-slider/react";

function App() {
  return (
    <SimplifySlider
      options={{
        loop: true,
      }}
    >
      <SimplifySlide>1</SimplifySlide>
      <SimplifySlide>2</SimplifySlide>
      <SimplifySlide>3</SimplifySlide>

      <div>테스트</div>
      <div>테스트</div>
      <div>테스트</div>
    </SimplifySlider>
  );
}

export default App;
