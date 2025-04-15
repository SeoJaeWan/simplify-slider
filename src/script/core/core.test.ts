import Core, { defaultOptions } from ".";
import Autoplay from "../autoplay";

describe("Core 테스트", () => {
  let wrapper: HTMLOListElement;
  const mockLength = 3;

  let now = 0;

  beforeEach(() => {
    wrapper = document.createElement("ol");
    Object.defineProperty(wrapper, "offsetWidth", {
      value: 1000,
    });

    for (let i = 0; i < mockLength; i++) {
      const listItem = document.createElement("li");
      listItem.textContent = `item ${i + 1}`;

      wrapper.appendChild(listItem);
    }

    jest.useFakeTimers();

    now = 0;
    global.performance.now = () => now;

    global.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      return setTimeout(() => {
        now += 100;
        cb(now);
      }, 100);
    }) as unknown as typeof requestAnimationFrame;

    global.cancelAnimationFrame = (id: number) => {
      clearTimeout(id);
    };
  });
  afterEach(() => {
    jest.useRealTimers();
    wrapper.remove();
  });

  it("Core 생성 시 wrapper의 첫 번째 자식으로 마지막 슬라이드의 클론이 생성된다.", () => {
    new Core(wrapper, mockLength);
    const clonedFirst = wrapper.firstElementChild;

    expect(clonedFirst?.classList.contains("cloned")).toBe(true);
    expect(clonedFirst?.textContent).toBe("item 3");
  });

  it("Core 생성 시 wrapper의 마지막 자식으로 첫 번째 슬라이드의 클론이 생성된다.", () => {
    new Core(wrapper, mockLength);
    const clonedLast = wrapper.lastElementChild;

    expect(clonedLast?.classList.contains("cloned")).toBe(true);
    expect(clonedLast?.textContent).toBe("item 1");
  });

  it("getCurrentIndex()가 호출되면 현재 슬라이드의 index 값을 얻을 수 있다.", () => {
    const core = new Core(wrapper, mockLength);

    expect(core.getCurrentIndex()).toBe(1);
  });

  it("next()를 호출하면 index가 증가해야 한다.", () => {
    const core = new Core(wrapper, mockLength);

    expect(core.getCurrentIndex()).toBe(1);
    core.next();

    expect(core.getCurrentIndex()).toBe(2);
  });

  it("prev()를 호출하면 index가 감소해야 한다.", () => {
    const core = new Core(wrapper, mockLength);

    core.next();
    expect(core.getCurrentIndex()).toBe(2);

    wrapper.dispatchEvent(new Event("transitionend"));

    core.prev();
    expect(core.getCurrentIndex()).toBe(1);
  });

  it("goTo()를 호출하면 index가 해당 값으로 변경되야 한다.", () => {
    const core = new Core(wrapper, mockLength);

    expect(core.getCurrentIndex()).toBe(1);
    core.goTo(3);

    expect(core.getCurrentIndex()).toBe(3);
  });

  it("goTo()를 호출할 때 index가 범위를 벗어나면 오류가 발생하고 index는 유지되어야 한다.", () => {
    const core = new Core(wrapper, mockLength);
    expect(core.getCurrentIndex()).toBe(1);
    expect(() => core.goTo(5)).toThrow(RangeError);

    expect(core.getCurrentIndex()).toBe(1);
  });

  it("next()를 호출할 때 duration 시간 이전에 다시 호출해도 index는 증가하지 않아야 한다.", () => {
    const core = new Core(wrapper, mockLength);

    core.next();
    expect(core.getCurrentIndex()).toBe(2);

    core.next();
    expect(core.getCurrentIndex()).toBe(2);
  });

  it("next()를 호출할 때 duration 시간 후에 다시 호출하면 index가 증가해야 한다.", () => {
    const core = new Core(wrapper, mockLength);

    core.next();
    expect(core.getCurrentIndex()).toBe(2);

    wrapper.dispatchEvent(new Event("transitionend"));

    core.next();
    expect(core.getCurrentIndex()).toBe(3);
  });

  it("옵션을 설정하지 않으면 기본 옵션이 적용된다.", () => {
    const core = new Core(wrapper, mockLength);

    expect(core.getOptions()).toEqual(defaultOptions);
  });

  it("duration 옵션을 설정하면 해당 값으로 duration이 설정된다.", () => {
    const duration = 2000;
    const core = new Core(wrapper, mockLength, { duration });

    expect(core.getOptions()).toEqual(
      expect.objectContaining({
        duration,
      }),
    );
  });

  it("loop 옵션을 설정하면 해당 값으로 loop이 설정된다.", () => {
    const core = new Core(wrapper, mockLength, { loop: true });

    expect(core.getOptions()).toEqual(
      expect.objectContaining({
        loop: true,
      }),
    );
  });

  it("drag 옵션을 설정하면 해당 값으로 drag이 설정된다.", () => {
    const core = new Core(wrapper, mockLength, { drag: true });

    expect(core.getOptions()).toEqual(
      expect.objectContaining({
        drag: true,
      }),
    );
  });

  it("loop 옵션이 없을 때 마지막 슬라이드에서 next()를 호출하면 index는 유지되어야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      loop: false,
    });

    core.goTo(mockLength);
    wrapper.dispatchEvent(new Event("transitionend"));
    expect(core.getCurrentIndex()).toBe(3);

    core.next();
    expect(core.getCurrentIndex()).toBe(3);
  });

  it("loop 옵션이 있을 때 마지막 슬라이드에서 next()를 호출하면 첫 번째 슬라이드로 돌아가야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      loop: true,
    });

    core.goTo(mockLength);
    wrapper.dispatchEvent(new Event("transitionend"));
    expect(core.getCurrentIndex()).toBe(3);

    core.next();
    expect(core.getCurrentIndex()).toBe(1);
  });

  it("loop 옵션이 없을 때 첫 번째 슬라이드에서 prev()를 호출하면 index는 유지되어야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      loop: false,
    });
    expect(core.getCurrentIndex()).toBe(1);

    core.prev();
    wrapper.dispatchEvent(new Event("transitionend"));
    expect(core.getCurrentIndex()).toBe(1);
  });

  it("loop 옵션이 있을 때 첫 번째 슬라이드에서 prev()를 호출하면 마지막 슬라이드로 이동해야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      loop: true,
    });

    expect(core.getCurrentIndex()).toBe(1);

    core.prev();
    wrapper.dispatchEvent(new Event("transitionend"));
    expect(core.getCurrentIndex()).toBe(3);
  });

  it("drag 옵션이 false일 때, Drag 클래스가 생성되지 않아야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      drag: false,
    });

    const drag = core.getIsDraggable();
    expect(drag).toBe(false);
  });

  it("drag 옵션이 true일 때, Drag 클래스가 생성되어야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      drag: true,
    });

    const drag = core.getIsDraggable();
    expect(drag).toBe(true);
  });

  it("drag 옵션이 true일 때, 왼쪽으로 50%이상 드래그하면 index가 증가해야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      drag: true,
    });
    expect(core.getCurrentIndex()).toBe(1);

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 500 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 0 }));

    jest.runAllTimers();

    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(core.getCurrentIndex()).toBe(2);
  });

  it("drag 옵션이 true일 때, 왼쪽으로 50%미만 드래그하면 index는 유지되어야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      drag: true,
    });
    expect(core.getCurrentIndex()).toBe(1);

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 500 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 1 }));

    jest.runAllTimers();

    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(core.getCurrentIndex()).toBe(1);
  });

  it("drag 옵션이 true일 때, 오른쪽으로 50%이상 드래그하면 index가 감소해야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      drag: true,
    });
    expect(core.getCurrentIndex()).toBe(1);

    core.next();
    wrapper.dispatchEvent(new Event("transitionend"));
    expect(core.getCurrentIndex()).toBe(2);

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 0 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 500 }));

    jest.runAllTimers();

    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(core.getCurrentIndex()).toBe(1);
  });

  it("drag 옵션이 true일 때, 오른쪽으로 50%미만 드래그하면 index는 유지되어야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      drag: true,
    });
    expect(core.getCurrentIndex()).toBe(1);

    core.next();
    wrapper.dispatchEvent(new Event("transitionend"));
    expect(core.getCurrentIndex()).toBe(2);

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 0 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 499 }));

    jest.runAllTimers();

    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(core.getCurrentIndex()).toBe(2);
  });

  it("drag, loop 옵션이 true일 때, 마지막 슬라이드에서 왼쪽으로 50%이상 드래그하면 첫 번째 슬라이드로 이동해야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      drag: true,
      loop: true,
    });
    core.goTo(mockLength);
    wrapper.dispatchEvent(new Event("transitionend"));
    expect(core.getCurrentIndex()).toBe(3);

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 500 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 0 }));

    jest.runAllTimers();

    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(core.getCurrentIndex()).toBe(1);
  });

  it("drag 옵션은 true이지만 loop 옵션이 false일 때, 마지막 슬라이드에서 왼쪽으로 50%이상 드래그하면 index는 유지되어야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      drag: true,
      loop: false,
    });

    core.goTo(mockLength);
    wrapper.dispatchEvent(new Event("transitionend"));
    expect(core.getCurrentIndex()).toBe(3);

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 500 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 0 }));

    jest.runAllTimers();

    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(core.getCurrentIndex()).toBe(3);
  });

  it("drag, loop 옵션이 true일 때, 첫 번째 슬라이드에서 오른쪽으로 50%이상 드래그하면 마지막 슬라이드로 이동해야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      drag: true,
      loop: true,
    });
    expect(core.getCurrentIndex()).toBe(1);

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 0 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 500 }));

    jest.runAllTimers();

    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(core.getCurrentIndex()).toBe(3);
  });

  it("drag 옵션은 true이지만 loop 옵션이 false일 때, 첫 번째 슬라이드에서 오른쪽으로 50%이상 드래그하면 index는 유지되어야 한다.", () => {
    const core = new Core(wrapper, mockLength, {
      drag: true,
      loop: false,
    });
    expect(core.getCurrentIndex()).toBe(1);

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 0 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 500 }));

    jest.runAllTimers();

    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(core.getCurrentIndex()).toBe(1);
  });

  it("destroy()가 호출되면 drag 클래스가 제거되고, 이벤트 리스너가 제거된다.", () => {
    const core = new Core(wrapper, mockLength, {
      drag: true,
    });

    const drag = core.getIsDraggable();
    expect(drag).toBe(true);

    core.destroy();

    const dragAfterDestroy = core.getIsDraggable();
    expect(dragAfterDestroy).toBe(false);

    expect(core.getCurrentIndex()).toBe(1);

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 500 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 0 }));

    jest.runAllTimers();

    window.dispatchEvent(new MouseEvent("mouseup"));

    expect(core.getCurrentIndex()).toBe(1);
  });

  it("autoplay 옵션이 false일 때, interval에 따라 자동으로 index가 증가하지 않는다.", () => {
    const core = new Core(wrapper, mockLength, {
      autoplay: {
        enabled: false,
        interval: 1000,
      },
    });

    expect(core.getCurrentIndex()).toBe(1);
    jest.runAllTimers();
    wrapper.dispatchEvent(new Event("transitionend"));

    expect(core.getCurrentIndex()).toBe(1);
    jest.runAllTimers();
    wrapper.dispatchEvent(new Event("transitionend"));

    expect(core.getCurrentIndex()).toBe(1);
  });

  it("autoplay 옵션이 true일 때, interval에 따라 자동으로 index가 증가한다.", () => {
    const core = new Core(wrapper, mockLength, {
      autoplay: {
        enabled: true,
        interval: 1000,
      },
    });

    expect(core.getCurrentIndex()).toBe(1);
    jest.runAllTimers();
    wrapper.dispatchEvent(new Event("transitionend"));

    expect(core.getCurrentIndex()).toBe(2);
    jest.runAllTimers();
    wrapper.dispatchEvent(new Event("transitionend"));

    expect(core.getCurrentIndex()).toBe(3);
  });

  it("autoplay 옵션이 true고 direction이 left일 때, interval에 따라 자동으로 index가 감소한다.", () => {
    const core = new Core(wrapper, mockLength, {
      loop: true,
      autoplay: {
        enabled: true,
        interval: 1000,
        direction: "left",
      },
    });

    expect(core.getCurrentIndex()).toBe(1);
    jest.runAllTimers();
    wrapper.dispatchEvent(new Event("transitionend"));

    expect(core.getCurrentIndex()).toBe(3);
    jest.runAllTimers();
    wrapper.dispatchEvent(new Event("transitionend"));

    expect(core.getCurrentIndex()).toBe(2);
  });

  it("autoplay 옵션이 true고 drag 옵션이 true일 때, drag 이벤트가 발생하면 autoplay의 stop()이 호출된다.", () => {
    const stopSpy = jest.spyOn(Autoplay.prototype, "stop");

    new Core(wrapper, mockLength, {
      loop: true,
      drag: true,
      autoplay: {
        enabled: true,
        interval: 1000,
      },
    });

    wrapper.dispatchEvent(new MouseEvent("mousedown", { clientX: 500 }));
    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 1 }));

    expect(stopSpy).toHaveBeenCalled();
  });

  it("autoplay 옵션에서 onProgress가 설정되면, autoplay 진행 중에 해당 콜백이 호출된다.", () => {
    const progressCallback = jest.fn();
    new Core(wrapper, mockLength, {
      autoplay: {
        enabled: true,
        interval: 1000,
        onProgress: progressCallback,
      },
    });

    jest.runAllTimers();

    expect(progressCallback).toHaveBeenCalledTimes(9);
  });
});
