/**
 * @typedef {Object} ScrollOptions
 * @property {boolean} [loop=false] - Whether to loop the slides or not. Default is false.
 * @property {boolean} [drag=false] - Whether to enable drag functionality. Default is false.
 * @property {number} [duration=500] - Duration of the transition in milliseconds. Default is 500.
 */
export interface ScrollOptions {
  loop?: boolean;
  duration?: number;
  drag?: boolean;
  autoplay?: AutoplayOptions;
}

/**
 * @typedef {Object} AutoplayOptions
 * @property {boolean} enabled - Whether to enable autoplay functionality. Default is false.
 * @property {number} [interval=3000] - Interval between slides in milliseconds. Default is 3000.
 * @property {"right" | "left"} [direction="right"] - Direction of autoplay. Default is "right".
 */
export interface AutoplayOptions {
  enabled: boolean;
  interval?: number;
  direction?: "right" | "left";
  onProgress?: (progress: number) => void;
}
