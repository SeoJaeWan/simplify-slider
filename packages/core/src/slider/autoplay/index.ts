class Autoplay {
  #interval: number;
  #frameId: number | null = null;
  #startTime: number = 0;

  constructor(interval: number) {
    this.#interval = interval;

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  public start(callback: () => void, progress?: (progress: number) => void) {
    this.stop();
    this.#startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - this.#startTime;
      const progressValue = Math.max(0, Math.min(1, elapsed / this.#interval));

      if (progressValue < 1) {
        this.#frameId = requestAnimationFrame(step);
        if (progress) {
          progress(progressValue);
        }
      } else {
        callback();
      }
    };

    this.#frameId = requestAnimationFrame(step);
  }

  public stop() {
    if (this.#frameId) {
      cancelAnimationFrame(this.#frameId);
      this.#frameId = null;
    }
  }
}

export default Autoplay;
