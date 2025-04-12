export interface MoveScrollOptions {
  /**
   * Whether to loop the slides when reaching the end or beginning.
   * @default false
   * @type {boolean}
   */
  loop?: boolean;
  /**
   * Duration of the transition effect in milliseconds.
   * @default 500
   * @type {number}
   */
  duration?: number;
  /**
   * Whether to enable drag functionality for the slides.
   * @default false
   * @type {boolean}
   */
  drag?: boolean;
}
