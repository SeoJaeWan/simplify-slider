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
    new Move(wrapper, duration, 1, 0);

    expect(wrapper.style.transform).toBe("translateX(-1000px)");
  });

  it("goToIndex()에 2를 넘겨주면 두 번째 슬라이드의 위치로 이동하고 duration이 전달된 값으로 설정된다.", () => {
    const move = new Move(wrapper, duration, 1, 0);
    move.goToIndex(2);

    expect(wrapper.style.transform).toBe("translateX(-2000px)");
    expect(wrapper.style.transitionProperty).toBe("transform");
    expect(wrapper.style.transitionDuration).toBe("3000ms");
  });

  it("Move 생성 시 slidesPerView를 2로 설정하고 이동하면 화면에서 나누는 값만큼 이동한다.", () => {
    const move = new Move(wrapper, duration, 2, 0);
    move.goToIndex(2);

    expect(wrapper.style.transform).toBe("translateX(-1500px)");
  });
  it("Move 생성 시 spaceBetween을 10으로 설정하고 이동하면 spaceBetween 만큼 더 이동한다.", () => {
    const move = new Move(wrapper, duration, 1, 10);
    expect(wrapper.style.transform).toBe("translateX(-1010px)");

    move.goToIndex(2);

    expect(wrapper.style.transform).toBe("translateX(-2020px)");
  });

  it("goToByDrag()에 3을 넘겨주면 세 번째 슬라이드의 위치로 이동하고 duration은 1000으로 설정된다.", () => {
    const move = new Move(wrapper, duration, 1, 0);

    move.goToByDrag(3);

    expect(wrapper.style.transform).toBe("translateX(-3000px)");
    expect(wrapper.style.transitionDuration).toBe("1000ms");
    expect(wrapper.style.transitionProperty).toBe("transform");
  });

  it("moveToIndex()에 4를 넘겨주면 네 번째 슬라이드의 위치로 이동한다.", () => {
    const move = new Move(wrapper, duration, 1, 0);
    move.moveToIndex(4);

    expect(wrapper.style.transform).toBe("translateX(-4000px)");
  });

  it("moveByOffset()에 x 값과 5를 넘겨주면 5번째 슬라이드에서 넘겨준 x 만큼의 위치로 이동한다.", () => {
    const move = new Move(wrapper, duration, 1, 0);
    move.moveByOffset(100, 5);

    expect(wrapper.style.transform).toBe("translateX(-4900px)");
  });
});
