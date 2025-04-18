import { INIT } from "../../constants";

class Move {
  #wrapper: HTMLOListElement;
  #duration: number;
  #slidesPerView: number;
  #spaceBetween: number;

  constructor(wrapper: HTMLOListElement, duration: number, slidesPerView: number, spaceBetween: number) {
    this.#wrapper = wrapper;
    this.#duration = duration;
    this.#slidesPerView = slidesPerView;
    this.#spaceBetween = spaceBetween;

    this.goToIndex = this.goToIndex.bind(this);
    this.goToByDrag = this.goToByDrag.bind(this);
    this.moveToIndex = this.moveToIndex.bind(this);
    this.moveByOffset = this.moveByOffset.bind(this);

    this.moveToIndex(INIT);
  }

  #getWrapperWidth() {
    return this.#wrapper.offsetWidth;
  }

  #getTranslateX(index: number) {
    const wrapperWidth = this.#getWrapperWidth();
    const translateX =
      (-index - (this.#slidesPerView - INIT)) * (wrapperWidth / this.#slidesPerView) -
      this.#spaceBetween * (this.#slidesPerView + index - 1);

    return translateX;
  }

  #updateSlide(index: number, duration: number) {
    this.#wrapper.style.transitionProperty = "transform";
    this.#wrapper.style.transitionDuration = `${duration}ms`;

    this.moveToIndex(index);
  }

  public moveByOffset(x: number, index: number) {
    this.#wrapper.style.transform = `translateX(${this.#getTranslateX(index) + x}px)`;
  }

  public moveToIndex(index: number) {
    this.#wrapper.style.transform = `translateX(${this.#getTranslateX(index)}px)`;
  }

  public goToByDrag(index: number) {
    this.#updateSlide(index, 1000);
  }

  public goToIndex(index: number) {
    this.#updateSlide(index, this.#duration);
  }
}

export default Move;
