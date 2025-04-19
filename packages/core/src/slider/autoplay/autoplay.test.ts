import Autoplay from ".";

describe("Autoplay 테스트", () => {
  let now = 0;

  beforeEach(() => {
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
  });

  it("start()가 호출되면 진행시간 동안 progress가 호출되고, 완료되면 callback이 호출된다.", () => {
    const callback = jest.fn();
    const progress = jest.fn();

    const autoplay = new Autoplay(1000);

    autoplay.start(callback, progress);
    expect(callback).not.toHaveBeenCalled();
    expect(progress).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(progress).toHaveBeenCalledWith(0.5);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(progress).toHaveBeenCalledTimes(9);
    expect(callback).toHaveBeenCalled();
  });

  it("stop()이 호출되면 start()가 중지된다.", () => {
    const callback = jest.fn();
    const progress = jest.fn();

    const autoplay = new Autoplay(1000);

    autoplay.start(callback, progress);

    jest.advanceTimersByTime(500);
    expect(progress).toHaveBeenCalledTimes(5);
    expect(callback).not.toHaveBeenCalled();

    autoplay.stop();

    jest.advanceTimersByTime(500);
    expect(progress).toHaveBeenCalledTimes(5);
    expect(callback).not.toHaveBeenCalled();
  });

  it("start()가 호출된 후 다시 start()가 호출되면 이전 애니메이션이 중지되고 새로운 애니메이션이 시작된다.", () => {
    const callback = jest.fn();
    const progress = jest.fn();

    const autoplay = new Autoplay(1000);

    autoplay.start(callback, progress);

    jest.advanceTimersByTime(500);
    expect(progress).toHaveBeenCalledWith(0.5);
    expect(callback).not.toHaveBeenCalled();

    autoplay.start(callback, progress);

    jest.advanceTimersByTime(500);
    expect(progress).toHaveBeenCalledWith(0.5);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(progress).toHaveBeenCalledTimes(14);
    expect(callback).toHaveBeenCalled();
  });
});
