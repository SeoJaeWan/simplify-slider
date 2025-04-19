import { INIT } from "../../constants";
import Drag from "../drag";
import Move from "../move";
import Autoplay from "../autoplay";
import { InvalidSlideLengthError } from "../../errors";
import type { DragAction } from "../../types/drag.types";
import type { AutoplayOptions, ScrollOptions, SimplifySliderOptions } from "../../types/scroll.types";

const defaultAutoplayOptions: AutoplayOptions = {
  interval: 3000,
  direction: "right",
  rolling: false,
  onProgress: () => {},
};

export const defaultOptions: ScrollOptions = {
  loop: false,
  drag: false,
  slidesPerView: 1,
  spaceBetween: 0,
  duration: 500,
};

class Core {
  #wrapper: HTMLOListElement;
  #currentIndex: number = 1;
  #options: ScrollOptions;

  #isLoading: boolean = false;

  #min: number = INIT;
  #max;

  #drag?: Drag;
  #autoplay?: Autoplay;
  #move: Move;

  constructor(wrapper: HTMLOListElement, length: number, options?: SimplifySliderOptions) {
    this.#wrapper = wrapper;
    this.#options = {
      ...defaultOptions,
      ...options,
      autoplay: options?.autoplay ? { ...defaultAutoplayOptions, ...options.autoplay } : undefined,
    };
    this.#max = length;

    if (length < 1) {
      throw new InvalidSlideLengthError();
    }

    this.#move = new Move(
      this.#wrapper,
      this.#options.duration,
      this.#options.slidesPerView,
      this.#options.spaceBetween,
    );
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.goTo = this.goTo.bind(this);
    this.getCurrentIndex = this.getCurrentIndex.bind(this);
    this.getOptions = this.getOptions.bind(this);

    this.#init();
    this.#initDrag();
    this.#initAutoplay();
  }

  #init() {
    if (this.#wrapper.querySelectorAll(".cloned").length !== 0) return;

    const slides = this.#wrapper.children;
    this.#wrapper.style.gap = `${this.#options.spaceBetween}px`;

    for (const slide of slides) {
      if (slide instanceof HTMLElement) {
        const totalGap = this.#options.spaceBetween * (this.#options.slidesPerView - 1);

        slide.style.flexBasis = `calc((100% - ${totalGap}px) / ${this.#options.slidesPerView})`;
      }
    }

    const lastChildren: HTMLElement[] = [];

    for (let i = 0; i < this.#options.slidesPerView; i++) {
      const child = this.#wrapper.children[this.#max - this.#options.slidesPerView + i];
      if (child instanceof HTMLElement) {
        const clonedChild = child.cloneNode(true) as HTMLElement;
        clonedChild.classList.add("cloned");

        lastChildren.push(clonedChild);
      }
    }

    const firstChildren: HTMLElement[] = [];

    for (let i = 0; i < this.#options.slidesPerView; i++) {
      const child = this.#wrapper.children[i];
      if (child instanceof HTMLElement) {
        const clonedChild = child.cloneNode(true) as HTMLElement;
        clonedChild.classList.add("cloned");

        firstChildren.push(clonedChild);
      }
    }

    const firstChild = this.#wrapper.firstChild;

    for (const child of lastChildren) {
      this.#wrapper.insertBefore(child, firstChild);
    }

    for (const child of firstChildren) {
      this.#wrapper.appendChild(child);
    }

    this.#updateTransition();
  }

  #initDrag() {
    if (!this.#options.drag) return;
    if (this.#getIsRolling()) return;

    this.#drag = new Drag({
      element: this.#wrapper,
      dragMove: this.#dragMove,
      dragUpdate: this.#dragUpdate,
    });
  }

  #initAutoplay() {
    if (!this.#options.autoplay) return;
    if (this.#getIsRolling()) {
      this.#options.autoplay.interval = 0;
    }

    this.#autoplay = new Autoplay(this.#options.autoplay.interval);
    this.#autoplayStart();
  }

  #updateTransition = () => {
    if (this.#getIsRolling()) {
      this.#wrapper.style.transitionTimingFunction = "linear";
    } else {
      this.#wrapper.style.transitionTimingFunction = "ease";
    }
  };

  #autoplayStart = () => {
    if (!this.#autoplay || !this.#options.autoplay) return;

    this.#autoplay.start(() => {
      if (this.#options.autoplay?.direction === "left") {
        this.#forcePrev();
      } else {
        this.#forceNext();
      }
    }, this.#options.autoplay.onProgress);
  };

  #autoplayStop = () => {
    if (!this.#autoplay) return;

    this.#autoplay.stop();
  };

  #dragMove = (diffX: number) => {
    this.#move.moveByOffset(diffX, this.#currentIndex);
    this.#autoplayStop();
  };

  #dragUpdate = (dragAction: DragAction) => {
    if (this.#isLoading) return;

    if (dragAction === "prev" && (this.#options.loop || this.#currentIndex !== this.#min)) {
      this.#currentIndex = this.#currentIndex - 1;
    } else if (dragAction === "next" && (this.#options.loop || this.#currentIndex !== this.#max)) {
      this.#currentIndex = this.#currentIndex + 1;
    } else {
      this.#autoplayStart();
    }

    this.#clearTransition();
    this.#move.goToByDrag(this.#currentIndex);
  };

  #disableTransition() {
    this.#wrapper.style.transition = "none";
  }

  #transitionEnd = () => {
    this.#disableTransition();

    if (this.#currentIndex > this.#max) {
      this.#currentIndex = this.#min;
    } else if (this.#currentIndex < this.#min) {
      this.#currentIndex = this.#max;
    }

    this.#move.moveToIndex(this.#currentIndex);
    this.#isLoading = false;

    this.#wrapper.removeEventListener("transitionend", this.#transitionEnd);
    this.#autoplayStart();
  };

  #clearTransition() {
    this.#wrapper.addEventListener("transitionend", this.#transitionEnd);
  }

  #moveTo(index: number) {
    if (this.#isLoading) return;

    const isOutBounds = !this.#options.loop && (index < this.#min || index > this.#max);
    if (isOutBounds) return;

    this.#updateTransition();

    this.#clearTransition();
    this.#currentIndex = index;
    this.#isLoading = true;

    this.#move.goToIndex(index);
  }

  #forceNext = () => {
    this.#moveTo(this.#currentIndex + 1);
  };

  #forcePrev = () => {
    this.#moveTo(this.#currentIndex - 1);
  };

  #safeMoveTo = (index: number) => {
    if (this.#getIsRolling()) return;
    this.#moveTo(index);
  };

  public next() {
    this.#safeMoveTo(this.#currentIndex + 1);
  }

  public prev() {
    this.#safeMoveTo(this.#currentIndex - 1);
  }

  public goTo(index: number) {
    if (index < this.#min || index > this.#max)
      throw new RangeError(`Index out of bounds: ${index}. Valid range is ${this.#min} to ${this.#max}.`);
    if (this.#currentIndex === index) return;

    this.#safeMoveTo(index);
  }

  public getCurrentIndex() {
    return this.#currentIndex > this.#max ? this.#min : this.#currentIndex < this.#min ? this.#max : this.#currentIndex;
  }

  public getOptions() {
    return this.#options;
  }

  public getIsDraggable() {
    return !!this.#drag;
  }

  public destroy() {
    if (this.#drag) {
      this.#drag.destroy();
    }

    this.#drag = undefined;
  }

  public getIsAutoplay() {
    return this.#options.autoplay;
  }

  #getIsRolling = () => {
    return this.#options?.autoplay?.rolling;
  };
}

export default Core;
