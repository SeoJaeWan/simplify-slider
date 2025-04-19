import { render } from "@testing-library/react";
import SimplifySlider from ".";
import SimplifySlide from "../simplifySlide";

describe("Simplify Slider 테스트", () => {
  it("Simplify Slide를 children으로 전달받으면 Simplify Slider의 list 클래스 아래에 클론 요소와 함께 렌더링된다.", () => {
    const { container } = render(
      <SimplifySlider>
        <SimplifySlide>Test</SimplifySlide>
      </SimplifySlider>,
    );

    const slides = container.querySelectorAll(".list > .simplify-slide");
    expect(slides.length).toBe(3);
  });

  it("children으로 전달받은 Simplify Slide가 아닌 다른 요소는 list 클래스 아래에 렌더링되지 않는다.", () => {
    const { container, getByText } = render(
      <SimplifySlider>
        <SimplifySlide>Test</SimplifySlide>
        <div>Other</div>
      </SimplifySlider>,
    );

    const listElement = container.querySelector(".list");
    const slideContent = container.querySelector(".simplify-slide:not(.cloned)");
    const otherContent = getByText("Other");

    expect(listElement).toContainElement(slideContent as HTMLElement);
    expect(listElement).not.toContainElement(otherContent);
    expect(container).toContainElement(otherContent);
  });
  // todo: HOC 테스트 추가 필요
});
