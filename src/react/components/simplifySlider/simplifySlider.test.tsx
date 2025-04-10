import { render } from "@testing-library/react";
import SimplifySlider from ".";
import SimplifySlide from "../simplifySlide";

describe("Simplify Slider 테스트", () => {
  it("React Node를 children으로 전달받으면 Simplify Slider와 함께 렌더링된다.", () => {
    const { container, getByText } = render(
      <SimplifySlider>
        <div>Test</div>
      </SimplifySlider>,
    );

    const slider = container.querySelector(".simplify-slider");
    expect(slider).toBeInTheDocument();

    const children = getByText("Test");
    expect(children).toBeInTheDocument();
  });

  it("문자열을 children으로 전달받으면 Simplify Slider와 함께 렌더링된다.", () => {
    const { container, getByText } = render(<SimplifySlider>Test</SimplifySlider>);

    const slider = container.querySelector(".simplify-slider");
    expect(slider).toBeInTheDocument();

    const children = getByText("Test");
    expect(children).toBeInTheDocument();
  });

  it("Simplify Slide를 children으로 전달받으면 Simplify Slider의 list 클래스 아래에 렌더링된다.", () => {
    const { container } = render(
      <SimplifySlider>
        <SimplifySlide>Test</SimplifySlide>
      </SimplifySlider>,
    );

    const slide = container.querySelector(".list > .simplify-slide");
    expect(slide).toBeInTheDocument();
  });

  it("Simplify Slide를 HOC로 전달받으면 Simplify Slider의 list 클래스 아래에 렌더링된다.", () => {
    const HocSlide = SimplifySlide;

    const { container } = render(
      <SimplifySlider>
        <HocSlide>Test</HocSlide>
      </SimplifySlider>,
    );

    const slide = container.querySelector(".list > .simplify-slide");
    expect(slide).toBeInTheDocument();
  });
});
