import { MoveScrollOptions } from "../../types/moveScroll.types";
import { Drag } from "../drag";

const defaultOptions: MoveScrollOptions = {
  loop: false,
  drag: false,
  duration: 500,
};
class MoveScroll {
  private wrapper: HTMLOListElement;
  private length: number;
  private currentIndex: number = 1;
  private options: MoveScrollOptions;

  private isLoading: boolean = false;

  private min: number = 1;
  private max;

  private drag?: Drag;

  constructor(wrapper: HTMLOListElement, length: number, options?: MoveScrollOptions) {
    this.wrapper = wrapper;
    this.length = length;
    this.options = { ...defaultOptions, ...options };

    this.max = length;

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

    this.setCurrentIndexTransform();

    this.initDrag();
  }

  private initDrag() {
    if (!this.options.drag) return;

    this.drag = new Drag({
      element: this.wrapper,
      getTranslateX: this.getTranslateX.bind(this),
      getWrapperWidth: this.getWrapperWidth.bind(this),
      onDragMove: this.updateTransform.bind(this),
      onDragSlide: (direction) => {
        if (this.isLoading) return;

        if (direction === "prev") {
          if (!this.options.loop && this.currentIndex === this.min) {
            this.updateSlide(1000);
          } else {
            this.prev();
          }
        } else if (direction === "next") {
          if (!this.options.loop && this.currentIndex === this.max) {
            this.updateSlide(1000);
          } else {
            this.next();
          }
        }
      },
    });
  }

  private disableTransition() {
    this.wrapper.style.transition = "none";
  }

  private updateTransform(x: number) {
    this.wrapper.style.transform = `translateX(${x}px)`;
  }

  private getWrapperWidth() {
    return this.wrapper.offsetWidth;
  }

  private getTranslateX() {
    const wrapperWidth = this.getWrapperWidth();
    const translateX = -this.currentIndex * wrapperWidth;

    return translateX;
  }

  private setCurrentIndexTransform() {
    this.updateTransform(this.getTranslateX());
  }

  private transitionEnd = () => {
    this.disableTransition();

    if (this.currentIndex > this.max) {
      this.currentIndex = 1;
      this.setCurrentIndexTransform();
    } else if (this.currentIndex < this.min) {
      this.currentIndex = this.length;
      this.setCurrentIndexTransform();
    }

    this.isLoading = false;
  };

  private clearTransition() {
    this.wrapper.addEventListener("transitionend", this.transitionEnd);
  }

  private updateSlide(duration?: number) {
    this.isLoading = true;
    this.wrapper.style.transition = `transform ${duration}ms`;

    this.setCurrentIndexTransform();
    this.clearTransition();
  }

  private moveTo(index: number) {
    if (this.isLoading) return;

    const isOutBounds = !this.options.loop && (index < this.min || index > this.max);

    if (isOutBounds) return;

    this.currentIndex = index;
    this.updateSlide(this.options.duration);
  }

  public next(): void {
    this.moveTo(this.getCurrentIndex() + 1);
  }

  public prev(): void {
    this.moveTo(this.getCurrentIndex() - 1);
  }

  public goTo(index: number): void {
    this.moveTo(index);
  }

  public getCurrentIndex(): number {
    return this.currentIndex > this.max ? this.min : this.currentIndex < this.min ? this.max : this.currentIndex;
  }
}

export default MoveScroll;
