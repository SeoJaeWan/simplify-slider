import { render, renderHook } from "@testing-library/react";
import useSimplifySlide from ".";
import UninitializedCoreError from "../../../errors/uninitializedCoreError";
import SimplifySlider from "../../components/simplifySlider";
import SimplifySlide from "../../components/simplifySlide";

describe("useSimplifySlide 테스트", () => {
  it("useSimplifySlide의 core를 Simplify Slider에 전달하지 않고 함수를 호출하면 오류가 발생한다.", () => {
    const { result } = renderHook(() => useSimplifySlide());
    const { next } = result.current;

    expect(() => next()).toThrow(UninitializedCoreError);
  });

  it("useSimplifySlide의 core를 Simplify Slider에 전달하고 next 함수를 호출하면 오류가 발생하지 않는다.", () => {
    const { result } = renderHook(() => useSimplifySlide());
    const { core, next } = result.current;

    render(
      <SimplifySlider ref={core} options={{ loop: true }}>
        <SimplifySlide>Test</SimplifySlide>
        <SimplifySlide>Test</SimplifySlide>
        <SimplifySlide>Test</SimplifySlide>
      </SimplifySlider>,
    );

    expect(() => next()).not.toThrow();
  });

  it("useSimplifySlide의 core를 Simplify Slider에 전달하고 prev 함수를 호출하면 오류가 발생하지 않는다.", () => {
    const { result } = renderHook(() => useSimplifySlide());
    const { core, prev } = result.current;

    render(
      <SimplifySlider ref={core} options={{ loop: true }}>
        <SimplifySlide>Test</SimplifySlide>
        <SimplifySlide>Test</SimplifySlide>
        <SimplifySlide>Test</SimplifySlide>
      </SimplifySlider>,
    );

    expect(() => prev()).not.toThrow();
  });

  it("useSimplifySlide의 core를 Simplify Slider에 전달하고 goTo 함수를 호출하면 오류가 발생하지 않는다.", () => {
    const { result } = renderHook(() => useSimplifySlide());
    const { core, goTo } = result.current;

    render(
      <SimplifySlider ref={core} options={{ loop: true }}>
        <SimplifySlide>Test</SimplifySlide>
        <SimplifySlide>Test</SimplifySlide>
        <SimplifySlide>Test</SimplifySlide>
      </SimplifySlider>,
    );

    expect(() => goTo(1)).not.toThrow();
  });

  it("useSimplifySlide의 core를 Simplify Slider에 전달하고 getCurrentIndex 함수를 호출하면 오류가 발생하지 않는다.", () => {
    const { result } = renderHook(() => useSimplifySlide());
    const { core, getCurrentIndex } = result.current;

    render(
      <SimplifySlider ref={core} options={{ loop: true }}>
        <SimplifySlide>Test</SimplifySlide>
        <SimplifySlide>Test</SimplifySlide>
        <SimplifySlide>Test</SimplifySlide>
      </SimplifySlider>,
    );

    expect(() => getCurrentIndex()).not.toThrow();
  });

  it("useSimplifySlide의 core를 Simplify Slider에 전달하고 getOptions 함수를 호출하면 오류가 발생하지 않는다.", () => {
    const { result } = renderHook(() => useSimplifySlide());
    const { core, getOptions } = result.current;

    render(
      <SimplifySlider ref={core} options={{ loop: true }}>
        <SimplifySlide>Test</SimplifySlide>
        <SimplifySlide>Test</SimplifySlide>
        <SimplifySlide>Test</SimplifySlide>
      </SimplifySlider>,
    );

    expect(() => getOptions()).not.toThrow();
  });
});
