import { INIT } from "../../constants";

class Move {
  private wrapper: HTMLOListElement;
  private duration: number;

  constructor(wrapper: HTMLOListElement, duration: number) {
    this.wrapper = wrapper;
    this.duration = duration;

    this.goToIndex = this.goToIndex.bind(this);
    this.goToByDrag = this.goToByDrag.bind(this);
    this.moveToIndex = this.moveToIndex.bind(this);
    this.moveByOffset = this.moveByOffset.bind(this);

    this.moveToIndex(INIT);
  }

  private getWrapperWidth() {
    return this.wrapper.offsetWidth;
  }

  private getTranslateX(index: number) {
    const wrapperWidth = this.getWrapperWidth();
    const translateX = -index * wrapperWidth;

    return translateX;
  }

  private updateSlide(index: number, duration: number) {
    this.wrapper.style.transition = `transform ${duration}ms`;

    this.moveToIndex(index);
  }

  public moveByOffset(x: number, index: number) {
    this.wrapper.style.transform = `translateX(${this.getTranslateX(index) + x}px)`;
  }

  public moveToIndex(index: number) {
    this.wrapper.style.transform = `translateX(${this.getTranslateX(index)}px)`;
  }

  public goToByDrag(index: number) {
    this.updateSlide(index, 1000);
  }

  public goToIndex(index: number) {
    this.updateSlide(index, this.duration);
  }
}

export default Move;
