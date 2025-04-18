import Drag from ".";

describe("Drag 테스트", () => {
  let wrapper: HTMLOListElement;
  let dragUpdate: jest.Mock;
  let dragMove: jest.Mock;

  beforeEach(() => {
    wrapper = document.createElement("ol");
    const li = document.createElement("li");

    Object.defineProperty(li, "offsetWidth", {
      value: 1000,
    });

    wrapper.appendChild(li);

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

  it("마우스를 클릭하고 드래그 하지 않고 떼면 dragUpdate()에 back 값을 가진 콜백이 호출된다.", () => {
    new Drag({
      element: wrapper,
      dragMove,
      dragUpdate,
    });

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 0 }));
    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(dragUpdate).toHaveBeenCalledWith("back");
  });

  it("왼쪽으로 50%이상 드래그하면 dragUpdate()에 next 값을 가진 콜백이 호출된다.", () => {
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

  it("왼쪽으로 50%미만 드래그하면 dragUpdate()에 back 값을 가진 콜백이 호출된다.", () => {
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

  it("오른쪽으로 50%이상 드래그하면 dragUpdate()에 prev 값을 가진 콜백이 호출된다.", () => {
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

  it("오른쪽으로 50%미만 드래그하면 dragUpdate()에 back 값을 가진 콜백이 호출된다.", () => {
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
    expect(dragMove).toHaveBeenCalled();
  });

  it("destroy()가 호출되면 이벤트 리스너가 제거된다.", () => {
    const drag = new Drag({
      element: wrapper,
      dragMove,
      dragUpdate,
    });

    drag.destroy();

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 0 }));
    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(dragUpdate).not.toHaveBeenCalled();
  });
});
