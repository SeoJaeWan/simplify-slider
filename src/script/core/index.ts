import { Direction } from "../../types/drag.types";
import { ScrollOptions } from "../../types/scroll.types";
import { INIT } from "../../constants";
import Drag from "../drag";
import Move from "../move";

const defaultOptions: ScrollOptions = {
  loop: false,
  drag: false,
  duration: 500,
};
class Core {
  private wrapper: HTMLOListElement;
  private currentIndex: number = 1;
  private options: ScrollOptions;

  private isLoading: boolean = false;

  private min: number = INIT;
  private max;

  private drag?: Drag;
  private move: Move;

  constructor(wrapper: HTMLOListElement, length: number, options?: ScrollOptions) {
    this.wrapper = wrapper;
    this.options = { ...defaultOptions, ...options };
    this.max = length;

    this.move = new Move(this.wrapper, this.options.duration);

    this.transitionEnd = this.transitionEnd.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.dragUpdate = this.dragUpdate.bind(this);

    this.init();
  }

  private init() {
    if (this.wrapper.querySelectorAll(".cloned").length !== 0) return;

    const lastChild = this.wrapper.lastElementChild;
    const firstChild = this.wrapper.firstElementChild;

    if (!(lastChild && firstChild)) return;

    const clonedLast = lastChild.cloneNode(true);
    const clonedFirst = firstChild.cloneNode(true);

    if (!(clonedLast instanceof HTMLElement && clonedFirst instanceof HTMLElement)) return;

    clonedLast.classList.add("cloned");
    clonedFirst.classList.add("cloned");

    this.wrapper.insertBefore(clonedLast, firstChild);
    this.wrapper.appendChild(clonedFirst);

    this.initDrag();
  }

  private initDrag() {
    if (!this.options.drag) return;

    this.drag = new Drag({
      element: this.wrapper,
      dragMove: this.dragMove,
      dragUpdate: this.dragUpdate,
    });
  }

  private dragMove(diffX: number) {
    this.move.moveByOffset(diffX, this.currentIndex);
  }

  private dragUpdate(direction: Direction) {
    if (this.isLoading) return;

    if (direction === "prev" && (this.options.loop || this.currentIndex !== this.min)) {
      this.currentIndex = this.currentIndex - 1;
    } else if (direction === "next" && (this.options.loop || this.currentIndex !== this.max)) {
      this.currentIndex = this.currentIndex + 1;
    }

    this.clearTransition();
    this.move.goToByDrag(this.currentIndex);
  }

  private disableTransition() {
    this.wrapper.style.transition = "none";
  }

  private transitionEnd() {
    this.disableTransition();

    if (this.currentIndex > this.max) {
      this.currentIndex = this.min;
    } else if (this.currentIndex < this.min) {
      this.currentIndex = this.max;
    }

    this.move.moveToIndex(this.currentIndex);
    this.isLoading = false;
  }

  private clearTransition() {
    this.wrapper.addEventListener("transitionend", this.transitionEnd);
  }

  private moveTo(index: number) {
    if (this.isLoading) return;
    const isOutBounds = !this.options.loop && (index < this.min || index > this.max);

    if (isOutBounds) return;

    this.clearTransition();
    this.currentIndex = index;
    this.isLoading = true;

    this.move.goToIndex(index);
  }

  public next() {
    this.moveTo(this.currentIndex + 1);
  }

  public prev() {
    this.moveTo(this.currentIndex - 1);
  }

  public goTo(index: number) {
    this.moveTo(index);
  }

  public getCurrentIndex() {
    return this.currentIndex > this.max ? this.min : this.currentIndex < this.min ? this.max : this.currentIndex;
  }
}

export default Core;
