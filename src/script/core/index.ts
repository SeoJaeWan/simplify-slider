import { INIT } from "../../constants";
import Drag from "../drag";
import Move from "../move";
import type { Direction } from "../../types/drag.types";
import type { ScrollOptions } from "../../types/scroll.types";
import Autoplay from "../autoplay";
import InvalidSlideLengthError from "../../errors/invalidSlideLengthError";

export const defaultOptions: ScrollOptions = {
  loop: false,
  drag: false,
  autoplay: {
    direction: "right",
    rolling: false,
    interval: 3000,
    onProgress: () => {},
  },
  duration: 500,
};
class Core {
  #wrapper: HTMLOListElement;
  #currentIndex: number = 1;
  #options: Required<ScrollOptions>;

  #isLoading: boolean = false;

  #min: number = INIT;
  #max;

  #drag?: Drag;
  #autoplay?: Autoplay;
  #move: Move;

  constructor(wrapper: HTMLOListElement, length: number, options?: Partial<ScrollOptions>) {
    this.#wrapper = wrapper;
    this.#options = { ...defaultOptions, ...options };
    this.#max = length;

    if (length < 1) {
      throw new InvalidSlideLengthError();
    }

    this.#move = new Move(this.#wrapper, this.#options.duration);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.goTo = this.goTo.bind(this);
    this.getCurrentIndex = this.getCurrentIndex.bind(this);
    this.getOptions = this.getOptions.bind(this);

    this.#init();
    this.#initAutoplay();
  }

  #init() {
    if (this.#wrapper.querySelectorAll(".cloned").length !== 0) return;

    const lastChild = this.#wrapper.lastElementChild;
    const firstChild = this.#wrapper.firstElementChild;

    if (!(lastChild && firstChild)) return;

    const clonedLast = lastChild.cloneNode(true);
    const clonedFirst = firstChild.cloneNode(true);

    if (!(clonedLast instanceof HTMLElement && clonedFirst instanceof HTMLElement)) return;

    clonedLast.classList.add("cloned");
    clonedFirst.classList.add("cloned");

    this.#wrapper.insertBefore(clonedLast, firstChild);
    this.#wrapper.appendChild(clonedFirst);

    this.#initDrag();
  }

  #initDrag() {
    if (!this.#options.drag) return;

    this.#drag = new Drag({
      element: this.#wrapper,
      dragMove: this.#dragMove,
      dragUpdate: this.#dragUpdate,
    });
  }

  #initAutoplay() {
    if (!this.getIsAutoplay()) return;

    this.#autoplay = new Autoplay(this.#options.autoplay?.interval);
    this.#autoplayStart();
  }

  #autoplayStart = () => {
    if (!this.#autoplay) return;

    this.#autoplay.start(() => {
      if (this.#options.autoplay?.direction === "left") {
        this.prev();
      } else {
        this.next();
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

  #dragUpdate = (direction: Direction) => {
    if (this.#isLoading) return;

    if (direction === "prev" && (this.#options.loop || this.#currentIndex !== this.#min)) {
      this.#currentIndex = this.#currentIndex - 1;
    } else if (direction === "next" && (this.#options.loop || this.#currentIndex !== this.#max)) {
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

    this.#clearTransition();
    this.#currentIndex = index;
    this.#isLoading = true;

    this.#move.goToIndex(index);
  }

  public next() {
    this.#moveTo(this.#currentIndex + 1);
  }

  public prev() {
    this.#moveTo(this.#currentIndex - 1);
  }

  public goTo(index: number) {
    if (index < this.#min || index > this.#max)
      throw new RangeError(`Index out of bounds: ${index}. Valid range is ${this.#min} to ${this.#max}.`);
    if (this.#currentIndex === index) return;

    this.#moveTo(index);
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
}

export default Core;
