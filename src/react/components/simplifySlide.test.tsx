import { render } from "@testing-library/react";
import SimplifySlide from "./simplifySlide";

describe("Simplify Slide 테스트", () => {
  it("React Node를 children으로 전달받으면 Simplify Slide와 함께 렌더링된다.", () => {
    const { container, getByText } = render(
      <SimplifySlide>
        <div>Test</div>
      </SimplifySlide>,
    );

    const slider = container.querySelector(".simplify-slide");
    expect(slider).toBeInTheDocument();

    const children = getByText("Test");
    expect(children).toBeInTheDocument();
  });

  it("문자열을 children으로 전달받으면 Simplify Slide와 함께 렌더링된다.", () => {
    const { container, getByText } = render(<SimplifySlide>Test</SimplifySlide>);

    const slider = container.querySelector(".simplify-slide");
    expect(slider).toBeInTheDocument();

    const children = getByText("Test");
    expect(children).toBeInTheDocument();
  });
});
