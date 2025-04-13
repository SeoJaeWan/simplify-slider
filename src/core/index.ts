import { MoveScrollOptions } from "../types/moveScroll.types";
import Drag from "./drag";

const defaultOptions: MoveScrollOptions = Object.freeze({
  loop: false,
  drag: false,
  duration: 500,
});

class Core {
  private wrapper: HTMLOListElement;
  private length: number;
  private currentIndex: number = 1;
  private options: MoveScrollOptions;

  private isLoading: boolean = false;

  private drag: Drag;

  private min: number = 1;
  private max;

  constructor(wrapper: HTMLOListElement, length: number, options?: MoveScrollOptions) {
    this.wrapper = wrapper;
    this.length = length;
    this.options = { ...defaultOptions, ...options };

    this.max = length;

    this.drag = new Drag(this);

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

    if (this.options.drag) {
      this.wrapper.addEventListener("mousedown", this.drag.dragStart);
      window.addEventListener("mouseup", this.drag.dragEnd);
    }
  }

  private getWrapperWidth() {
    return this.wrapper.offsetWidth;
  }

  private getTranslateX() {
    const wrapperWidth = this.getWrapperWidth();
    const translateX = -this.currentIndex * wrapperWidth;

    return translateX;
  }

  private updateSlide() {
    this.isLoading = true;
    this.wrapper.style.transition = `transform ${this.options.duration}ms`;
    this.updateTransform(this.getTranslateX());

    this.clearTransition();
  }

  public next(): void {
    if (this.isLoading || (!this.options.loop && this.currentIndex === this.max)) return;

    this.updateCurrentIndex(1);
    this.updateSlide();
  }

  public prev(): void {
    if (this.isLoading || (!this.options.loop && this.currentIndex === this.min)) return;

    this.updateCurrentIndex(-1);
    this.updateSlide();
  }

  public goTo(index: number): void {
    if (this.isLoading) return;

    this.currentIndex = index;
    this.updateSlide();
  }

  public getCurrentIndex(): number {
    return this.currentIndex > this.max ? this.min : this.currentIndex < this.min ? this.max : this.currentIndex;
  }
}

export default Core;
