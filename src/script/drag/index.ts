import { Direction, DragOptions } from "../../types/drag.types";

class Drag {
  private isDrag = false;
  private isUpdate = false;
  private startX = 0;
  private currentX = 0;

  private animationFrameId: number | null = null;
  private pendingX: number | null = null;

  private readonly el: HTMLElement;
  private readonly dragMove: (x: number) => void;
  private readonly dragUpdate: (dir: Direction) => void;

  constructor(options: DragOptions) {
    this.el = options.element;
    this.dragMove = options.dragMove;
    this.dragUpdate = options.dragUpdate;

    this.dragStartMouse = this.dragStartMouse.bind(this);
    this.dragMoveMouse = this.dragMoveMouse.bind(this);

    this.dragStartTouch = this.dragStartTouch.bind(this);
    this.dragMoveTouch = this.dragMoveTouch.bind(this);

    this.dragEnd = this.dragEnd.bind(this);

    this.destroy();
    this.bindEvents();
  }

  private bindEvents() {
    this.el.addEventListener("mousedown", this.dragStartMouse);
    window.addEventListener("mouseup", this.dragEnd);
    window.addEventListener("mousemove", this.dragMoveMouse);

    this.el.addEventListener("touchstart", this.dragStartTouch, { passive: false });
    window.addEventListener("touchend", this.dragEnd);
    window.addEventListener("touchmove", this.dragMoveTouch, { passive: false });
  }

  public destroy() {
    this.el.removeEventListener("mousedown", this.dragStartMouse);
    window.removeEventListener("mouseup", this.dragEnd);
    window.removeEventListener("mousemove", this.dragMoveMouse);

    this.el.removeEventListener("touchstart", this.dragStartTouch);
    window.removeEventListener("touchend", this.dragEnd);
    window.removeEventListener("touchmove", this.dragMoveTouch);
  }

  private dragStartMouse(e: MouseEvent) {
    this.startDrag(e.clientX);
  }

  private dragStartTouch(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    this.startDrag(e.touches[0].clientX);
  }

  private startDrag(clientX: number) {
    this.isDrag = true;
    this.startX = clientX;
    this.currentX = clientX;

    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";

    this.isUpdate = false;
  }

  private dragMoveMouse(e: MouseEvent) {
    this.queueDrag(e.clientX);
  }

  private dragMoveTouch(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    this.queueDrag(e.touches[0].clientX);
  }

  private queueDrag(clientX: number) {
    if (!this.isDrag) return;

    this.pendingX = clientX;

    if (this.animationFrameId !== null) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.animationFrameId = null;
      if (this.pendingX === null) return;

      this.currentX = this.pendingX;
      const diffX = this.startX - this.currentX;
      const width = this.el.offsetWidth;

      if (Math.abs(diffX) >= width / 2) {
        if (diffX < 0) this.dragUpdate("prev");
        else this.dragUpdate("next");
        this.isUpdate = true;

        this.resetDragState();
      } else {
        this.dragMove(-diffX);
      }
    });
  }

  private resetDragState() {
    if (!this.isDrag) return;

    this.isDrag = false;
    this.startX = 0;
    this.currentX = 0;
    this.pendingX = null;

    document.body.style.cursor = "auto";
    document.body.style.userSelect = "auto";

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private dragEnd() {
    this.resetDragState();

    if (this.isUpdate) return;
    this.dragUpdate("back");
  }
}

export default Drag;
