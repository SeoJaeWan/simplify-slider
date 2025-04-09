import { render } from "@testing-library/react";
import { SimplifySlider } from "./simplifySlider";

describe("Simplify Slider 테스트", () => {
  it("ReactDOM을 children으로 전달받으면 Simplify Slider와 함께 렌더링된다.", () => {
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
});
