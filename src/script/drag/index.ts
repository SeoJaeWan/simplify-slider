import type { DragAction } from "../../types/drag.types";

interface DragOptions {
  element: HTMLElement;
  dragMove: (x: number) => void;
  dragUpdate: (direction: DragAction) => void;
}

class Drag {
  #isDrag = false;
  #isUpdate = false;
  #startX = 0;
  #currentX = 0;

  #animationFrameId: number | null = null;
  #pendingX: number | null = null;

  #el: HTMLElement;
  #dragMove: (diffX: number) => void;
  #dragUpdate: (direction: DragAction) => void;

  constructor(options: DragOptions) {
    this.#el = options.element;
    this.#dragMove = options.dragMove;
    this.#dragUpdate = options.dragUpdate;

    this.destroy();
    this.#bindEvents();
  }

  #bindEvents() {
    this.#el.addEventListener("mousedown", this.#dragStartMouse);
    window.addEventListener("mouseup", this.#dragEnd);
    window.addEventListener("mousemove", this.#dragMoveMouse);

    this.#el.addEventListener("touchstart", this.#dragStartTouch, { passive: false });
    window.addEventListener("touchend", this.#dragEnd);
    window.addEventListener("touchmove", this.#dragMoveTouch, { passive: false });
  }

  public destroy() {
    this.#el.removeEventListener("mousedown", this.#dragStartMouse);
    window.removeEventListener("mouseup", this.#dragEnd);
    window.removeEventListener("mousemove", this.#dragMoveMouse);

    this.#el.removeEventListener("touchstart", this.#dragStartTouch);
    window.removeEventListener("touchend", this.#dragEnd);
    window.removeEventListener("touchmove", this.#dragMoveTouch);
  }

  #dragStartMouse = (e: MouseEvent) => {
    this.#startDrag(e.clientX);
  };

  #dragStartTouch = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    this.#startDrag(e.touches[0].clientX);
  };

  #startDrag(clientX: number) {
    this.#isDrag = true;
    this.#startX = clientX;
    this.#currentX = clientX;

    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";

    this.#isUpdate = false;
  }

  #dragMoveMouse = (e: MouseEvent) => {
    this.#queueDrag(e.clientX);
  };

  #dragMoveTouch = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    this.#queueDrag(e.touches[0].clientX);
  };

  #queueDrag(clientX: number) {
    if (!this.#isDrag) return;

    this.#pendingX = clientX;

    if (this.#animationFrameId !== null) return;

    this.#animationFrameId = requestAnimationFrame(() => {
      this.#animationFrameId = null;
      if (this.#pendingX === null) return;

      this.#currentX = this.#pendingX;
      const diffX = this.#startX - this.#currentX;
      const children = this.#el.children[0] as HTMLElement;
      const width = children.offsetWidth;

      if (Math.abs(diffX) >= width / 2) {
        if (diffX < 0) this.#dragUpdate("prev");
        else this.#dragUpdate("next");
        this.#isUpdate = true;

        this.#resetDragState();
      } else {
        this.#dragMove(-diffX);
      }
    });
  }

  #resetDragState() {
    if (!this.#isDrag) return;

    this.#isDrag = false;
    this.#startX = 0;
    this.#currentX = 0;
    this.#pendingX = null;

    document.body.style.cursor = "auto";
    document.body.style.userSelect = "auto";

    if (this.#animationFrameId !== null) {
      cancelAnimationFrame(this.#animationFrameId);
      this.#animationFrameId = null;
    }
  }

  #dragEnd = () => {
    this.#resetDragState();

    if (this.#isUpdate) return;
    this.#dragUpdate("back");
  };
}

export default Drag;
