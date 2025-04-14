export type Direction = "prev" | "next" | "back";

export interface DragOptions {
  element: HTMLElement;
  dragMove: (x: number) => void;
  dragUpdate: (direction: Direction) => void;
}
