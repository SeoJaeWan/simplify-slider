import Drag from ".";

describe("Drag 테스트", () => {
  let wrapper: HTMLOListElement;
  let dragUpdate: jest.Mock;
  let dragMove: jest.Mock;

  beforeEach(() => {
    wrapper = document.createElement("ol");

    Object.defineProperty(wrapper, "offsetWidth", {
      value: 1000,
    });

    dragUpdate = jest.fn();
    dragMove = jest.fn();

    jest.useFakeTimers();

    global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
    global.cancelAnimationFrame = (id) => clearTimeout(id);
  });

  afterEach(() => {
    jest.useRealTimers();

    wrapper.remove();
  });

  it("왼쪽으로 50%이상 드래그하고 mouseUp이벤트가 발생하면 dragUpdate()에 next 값을 가진 콜백이 호출된다.", () => {
    new Drag({
      element: wrapper,
      dragMove,
      dragUpdate,
    });

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 500 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 0 }));

    jest.runAllTimers();

    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(dragUpdate).toHaveBeenCalledWith("next");
  });

  it("왼쪽으로 50%미만 드래그하고 mouseUp 이벤트가 발생하면 dragUpdate()에 back 값을 가진 콜백이 호출된다.", () => {
    new Drag({
      element: wrapper,
      dragMove,
      dragUpdate,
    });

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 500 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 1 }));
    window.dispatchEvent(new MouseEvent("mouseup"));

    jest.runAllTimers();

    expect(dragUpdate).toHaveBeenCalledWith("back");
  });

  it("오른쪽으로 50%이상 드래그하고 mouseUp 이벤트가 발생하면 dragUpdate()에 prev 값을 가진 콜백이 호출된다.", () => {
    new Drag({
      element: wrapper,
      dragMove,
      dragUpdate,
    });

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 0 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 500 }));

    jest.runAllTimers();

    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(dragUpdate).toHaveBeenCalledWith("prev");
  });

  it("오른쪽으로 50%미만 드래그하고 mouseUp 이벤트가 발생하면 dragUpdate()에 back 값을 가진 콜백이 호출된다.", () => {
    new Drag({
      element: wrapper,
      dragMove,
      dragUpdate,
    });

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 0 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 500 }));
    window.dispatchEvent(new MouseEvent("mouseup"));

    jest.runAllTimers();

    expect(dragUpdate).toHaveBeenCalledWith("back");
  });

  it("드래그 중에 마우스가 이동하면 dragMove()에 x값이 전달된다.", () => {
    new Drag({
      element: wrapper,
      dragMove,
      dragUpdate,
    });

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 0 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 300 }));

    jest.runAllTimers();

    expect(dragMove).toHaveBeenCalledWith(300);
  });
});
