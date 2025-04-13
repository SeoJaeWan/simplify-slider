import { MoveScrollOptions } from "../../types/moveScroll.types";

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

  private isDrag: boolean = false;
  private startX: number = 0;
  private currentX: number = 0;

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

    this.updateTransform(this.getTranslateX());
    this.setDrag();
  }

  private dragStart = (e: MouseEvent) => {
    if (this.isLoading) return;

    this.isDrag = true;
    this.startX = e.clientX;
    this.currentX = e.clientX;

    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    this.wrapper.style.transition = "none";

    window.addEventListener("mousemove", this.dragMove);
  };

  private dragMove = (e: MouseEvent) => {
    if (!this.isDrag) return;

    this.currentX = e.clientX;
    const width = this.getWrapperWidth();
    const diffX = this.startX - this.currentX;

    const prevX = this.getTranslateX() + width / 2;
    const nextX = this.getTranslateX() - width / 2;

    const dragX = this.getTranslateX() - diffX;

    if (dragX >= prevX) {
      if (!this.options.loop && this.currentIndex === this.min) {
        this.updateSlide();
      } else {
        this.prev();
      }
      this.dragEnd();
    } else if (dragX <= nextX) {
      if (!this.options.loop && this.currentIndex === this.max) {
        this.updateSlide();
      } else {
        this.next();
      }
      this.dragEnd();
    } else {
      this.updateTransform(this.getTranslateX() - diffX);
    }
  };

  private dragEnd = () => {
    this.isDrag = false;
    this.startX = 0;
    this.currentX = 0;

    document.body.style.cursor = "auto";
    document.body.style.userSelect = "auto";

    this.updateTransform(this.getTranslateX());
    window.removeEventListener("mousemove", this.dragMove);
  };

  private setDrag = () => {
    if (!this.options.drag) return;

    this.wrapper.addEventListener("mousedown", this.dragStart);
    window.addEventListener("mouseup", this.dragEnd);
  };

  private TransitionEnd = () => {
    this.wrapper.style.transition = "none";

    if (this.currentIndex > this.max) {
      this.currentIndex = 1;
      this.updateTransform(this.getTranslateX());
    } else if (this.currentIndex < this.min) {
      this.currentIndex = this.length;
      this.updateTransform(this.getTranslateX());
    }

    this.isLoading = false;
    this.wrapper.removeEventListener("transitionend", this.TransitionEnd);
  };

  private clearTransition() {
    this.wrapper.addEventListener("transitionend", this.TransitionEnd);
  }

  private getWrapperWidth() {
    return this.wrapper.offsetWidth;
  }

  private async updateCurrentIndex(index: number) {
    this.currentIndex = this.currentIndex + index;
  }

  private getTranslateX() {
    const wrapperWidth = this.getWrapperWidth();
    const translateX = -this.currentIndex * wrapperWidth;

    return translateX;
  }

  private updateTransform(x: number) {
    this.wrapper.style.transform = `translateX(${x}px)`;
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

export default MoveScroll;
