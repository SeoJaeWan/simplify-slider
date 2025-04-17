/**
 * @typedef {Object} ScrollOptions
 * @property {boolean} loop - Whether to loop the slides or not. Default is false.
 * @property {boolean} drag - Whether to enable drag functionality. Default is false.
 * @property {number} duration - Duration of the transition in milliseconds. Default is 500.
 */
export interface ScrollOptions {
  loop: boolean;
  duration: number;
  drag: boolean;
  slidesPerView: number;
  autoplay?: AutoplayOptions;
}

/**
 * @typedef {Object} AutoplayOptions
 * @property {number} interval - Interval between slides in milliseconds. Default is 3000.
 * @property {"right" | "left"} direction - Direction of autoplay. Default is "right".
 */
export interface AutoplayOptions {
  interval: number;
  direction: "right" | "left";
  rolling: boolean;
  onProgress: (progress: number) => void;
}

export interface SimplifySliderOptions extends Partial<Omit<ScrollOptions, "autoplay">> {
  autoplay?: Partial<AutoplayOptions>;
}
