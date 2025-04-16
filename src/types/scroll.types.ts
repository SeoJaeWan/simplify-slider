/**
 * ScrollOptions interface
 */

/**
 * @typedef {Object} ScrollOptions
 * @property {boolean} loop - Whether to loop the slides or not. Default is false.
 * @property {boolean} drag - Whether to enable drag functionality. Default is false.
 * @property {number} duration - Duration of the transition in milliseconds. Default is 500.
 */
export interface ScrollOptions {
  /** Whether to loop the slides or not. Default is false. */
  loop: boolean;
  /** Duration of the transition in milliseconds. Default is 500. */
  duration: number;
  /** Whether to enable drag functionality. Default is false. */
  drag: boolean;
  /** Whether to enable autoplay functionality. Default is false. */
  autoplay?: AutoplayOptions;
}

/**
 * @typedef {Object} AutoplayOptions
 * @property {number} interval - Interval between slides in milliseconds. Default is 3000.
 * @property {"right" | "left"} direction - Direction of autoplay. Default is "right".
 */
export interface AutoplayOptions {
  /** Interval between slides in milliseconds. Default is 3000. */
  interval: number;
  /** Direction of autoplay. Default is "right". */
  direction: Direction;
  /** Whether to roll the slides or not. Default is false. */
  rolling: boolean;
  /** Callback function to be called on progress. */
  onProgress: (progress: number) => void;
}

export interface SimplifySliderOptions extends Partial<Omit<ScrollOptions, "autoplay">> {
  autoplay?: Partial<AutoplayOptions>;
}

export type Direction = "right" | "left";
