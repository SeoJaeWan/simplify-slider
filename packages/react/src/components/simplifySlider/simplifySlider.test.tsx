import { render } from "@testing-library/react";
import SimplifySlider from ".";
import SimplifySlide from "../simplifySlide";
import Core from "@simplify-slider/core";

describe("Simplify Slider 테스트", () => {
  it("SimplifySlide 요소는 list 클래스 안에 렌더링된다", () => {
    const { container } = render(
      <SimplifySlider>
        <SimplifySlide>1</SimplifySlide>
        <SimplifySlide>2</SimplifySlide>
        <SimplifySlide>3</SimplifySlide>
      </SimplifySlider>,
    );

    const list = container.querySelector(".list");
    const slides = list?.querySelectorAll(".simplify-slide");

    expect(slides?.length).toBe(5);
    slides?.forEach((slide) => {
      expect(list).toContainElement(slide as HTMLElement);
    });
  });

  it("SimplifySlide가 아닌 요소는 list 밖에 렌더링된다", () => {
    const { container, getByText } = render(
      <SimplifySlider>
        <SimplifySlide>Slide</SimplifySlide>
        <div>Other Element</div>
      </SimplifySlider>,
    );

    const list = container.querySelector(".list")!;
    const otherElement = getByText("Other Element");

    expect(list).not.toContainElement(otherElement);
    expect(container).toContainElement(otherElement);
  });

  it("ref를 통해 Core 인스턴스를 외부에서 접근할 수 있다", () => {
    const ref = { current: null as unknown as Core };

    render(
      <SimplifySlider ref={ref}>
        <SimplifySlide>Test</SimplifySlide>
      </SimplifySlider>,
    );

    expect(ref.current).toBeInstanceOf(Core);
  });

  it("SimplifySlide가 아닌 텍스트 요소도 list 밖에 렌더링된다", () => {
    const { container, getByText } = render(
      <SimplifySlider>
        <SimplifySlide>Slide</SimplifySlide>
        텍스트 요소
      </SimplifySlider>,
    );

    const list = container.querySelector(".list")!;
    const textElement = getByText("텍스트 요소");

    expect(list).not.toContainElement(textElement);
    expect(container).toContainElement(textElement);
  });
  // todo: HOC 테스트 추가 필요
});
