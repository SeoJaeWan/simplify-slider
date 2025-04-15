import Move from ".";

describe("Move 테스트", () => {
  let wrapper: HTMLOListElement;
  const duration = 3000;

  beforeEach(() => {
    wrapper = document.createElement("ol");

    Object.defineProperty(wrapper, "offsetWidth", {
      value: 1000,
    });
  });

  afterEach(() => {
    wrapper.remove();
  });

  it("Move 생성 시 첫 번째 슬라이드의 위치로 이동한다.", () => {
    new Move(wrapper, duration);

    expect(wrapper.style.transform).toBe("translateX(-1000px)");
  });

  it("goToIndex()에 2를 넘겨주면 두 번째 슬라이드의 위치로 이동하고 duration은 생성 시 넘겨준 값이 된다.", () => {
    const move = new Move(wrapper, duration);
    move.goToIndex(2);

    expect(wrapper.style.transform).toBe("translateX(-2000px)");
    expect(wrapper.style.transition).toBe(`transform ${duration}ms`);
  });

  it("goToByDrag()에 3을 넘겨주면 세 번째 슬라이드의 위치로 이동하고 duration은 1000으로 설정된다.", () => {
    const move = new Move(wrapper, duration);

    move.goToByDrag(3);

    expect(wrapper.style.transform).toBe("translateX(-3000px)");
    expect(wrapper.style.transition).toBe("transform 1000ms");
  });

  it("moveToIndex()에 4를 넘겨주면 네 번째 슬라이드의 위치로 이동한다.", () => {
    const move = new Move(wrapper, duration);
    move.moveToIndex(4);

    expect(wrapper.style.transform).toBe("translateX(-4000px)");
  });

  it("moveByOffset()에 x 값과 5를 넘겨주면 5번째 슬라이드에서 넘겨준 x 만큼의 위치로 이동한다.", () => {
    const move = new Move(wrapper, duration);
    move.moveByOffset(100, 5);

    expect(wrapper.style.transform).toBe("translateX(-4900px)");
  });
});
