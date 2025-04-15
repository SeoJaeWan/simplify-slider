import { renderHook } from "@testing-library/react";
import useSimplifySlide from ".";
import UninitializedCoreError from "../../../errors/uninitializedCoreError";

describe("useSimplifySlide 테스트", () => {
  it("useSimplifySlide의 core를 Simplify Slider에 전달하지 않고 next()를 호출하면 오류가 발생한다.", () => {
    const { result } = renderHook(() => useSimplifySlide());
    const { next } = result.current;

    expect(() => next()).toThrow(UninitializedCoreError);
  });
});
