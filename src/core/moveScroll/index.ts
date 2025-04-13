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

  private bindTransitionEnd: () => void;

  private isDrag: boolean = false;
  private startX: number = 0;
  private currentX: number = 0;

  constructor(wrapper: HTMLOListElement, length: number, options?: MoveScrollOptions) {
    this.wrapper = wrapper;
    this.length = length;
    this.options = { ...defaultOptions, ...options };

    this.max = length;

    this.bindTransitionEnd = this.TransitionEnd.bind(this);

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
    this.setDrag();
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

  private setBodyDraggingStyle(isDragging: boolean) {
    document.body.style.cursor = isDragging ? "grabbing" : "auto";
    document.body.style.userSelect = isDragging ? "none" : "auto";
  }

  private dragStart = (e: MouseEvent) => {
    if (this.isLoading) return;

    this.isDrag = true;
    this.startX = e.clientX;
    this.currentX = e.clientX;

    this.setBodyDraggingStyle(true);
    this.disableTransition();

    window.addEventListener("mousemove", this.dragMove);
  };

  private checkOverPrevBound(currentX: number, width: number) {
    return currentX >= this.getTranslateX() + width / 2;
  }

  private checkOverNextBound(currentX: number, width: number) {
    return currentX <= this.getTranslateX() - width / 2;
  }

  private slideMovement(direction: "prev" | "next") {
    if (direction === "prev") {
      if (!this.options.loop && this.currentIndex === this.min) {
        this.updateSlide(1000);
      } else {
        this.prev();
      }
    } else {
      if (!this.options.loop && this.currentIndex === this.max) {
        this.updateSlide(1000);
      } else {
        this.next();
      }
    }
    this.dragEnd();
  }

  private dragMove = (e: MouseEvent) => {
    if (!this.isDrag) return;

    this.currentX = e.clientX;

    const width = this.getWrapperWidth();
    const diffX = this.startX - this.currentX;

    const currentX = this.getTranslateX() - diffX;

    if (this.checkOverPrevBound(currentX, width)) {
      this.slideMovement("prev");
    } else if (this.checkOverNextBound(currentX, width)) {
      this.slideMovement("next");
    } else {
      this.updateTransform(currentX);
    }
  };

  private dragEnd = () => {
    if (this.isDrag) {
      this.isDrag = false;
      this.startX = 0;
      this.currentX = 0;

      this.setBodyDraggingStyle(false);

      this.setCurrentIndexTransform();
      window.removeEventListener("mousemove", this.dragMove);
    }
  };

  private setDrag() {
    if (!this.options.drag) return;

    this.wrapper.addEventListener("mousedown", this.dragStart);
    window.addEventListener("mouseup", this.dragEnd);
  }

  private TransitionEnd() {
    this.disableTransition();

    if (this.currentIndex > this.max) {
      this.currentIndex = 1;
      this.setCurrentIndexTransform();
    } else if (this.currentIndex < this.min) {
      this.currentIndex = this.length;
      this.setCurrentIndexTransform();
    }

    this.isLoading = false;
  }

  private clearTransition() {
    this.wrapper.addEventListener("transitionend", this.bindTransitionEnd);
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
    this.moveTo(this.currentIndex + 1);
  }

  public prev(): void {
    this.moveTo(this.currentIndex - 1);
  }

  public goTo(index: number): void {
    this.moveTo(index);
  }

  public getCurrentIndex(): number {
    return this.currentIndex > this.max ? this.min : this.currentIndex < this.min ? this.max : this.currentIndex;
  }
}

export default MoveScroll;
