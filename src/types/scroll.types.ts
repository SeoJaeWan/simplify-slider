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
}
