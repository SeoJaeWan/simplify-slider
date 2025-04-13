type Direction = "prev" | "next" | "move";

interface DragOptions {
  element: HTMLElement;
  getTranslateX: () => number;
  getWrapperWidth: () => number;
  onDragMove: (x: number) => void;
  onDragSlide: (direction: Direction) => void;
}

export class Drag {
  private isDrag = false;
  private startX = 0;
  private currentX = 0;

  private animationFrameId: number | null = null;
  private pendingX: number | null = null;

  private readonly el: HTMLElement;
  private readonly getTranslateX: () => number;
  private readonly getWrapperWidth: () => number;
  private readonly onDragMove: (x: number) => void;
  private readonly onDragSlide: (dir: Direction) => void;

  constructor(options: DragOptions) {
    this.el = options.element;
    this.getTranslateX = options.getTranslateX;
    this.getWrapperWidth = options.getWrapperWidth;
    this.onDragMove = options.onDragMove;
    this.onDragSlide = options.onDragSlide;

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

  private dragStartMouse = (e: MouseEvent) => {
    this.startDrag(e.clientX);
  };

  private dragStartTouch = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    this.startDrag(e.touches[0].clientX);
  };

  private startDrag(clientX: number) {
    this.isDrag = true;
    this.startX = clientX;
    this.currentX = clientX;

    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  }

  private dragMoveMouse = (e: MouseEvent) => {
    this.queueDrag(e.clientX);
  };

  private dragMoveTouch = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    this.queueDrag(e.touches[0].clientX);
  };

  private queueDrag(clientX: number) {
    if (!this.isDrag) return;

    this.pendingX = clientX;

    if (this.animationFrameId !== null) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.animationFrameId = null;
      if (this.pendingX === null) return;

      this.currentX = this.pendingX;
      const diffX = this.startX - this.currentX;
      const width = this.getWrapperWidth();
      const baseX = this.getTranslateX();
      const newX = baseX - diffX;

      if (newX >= baseX + width / 2) {
        this.onDragSlide("prev");
        this.dragEnd();
      } else if (newX <= baseX - width / 2) {
        this.onDragSlide("next");
        this.dragEnd();
      } else {
        this.onDragMove(newX);
      }
    });
  }

  private dragEnd = () => {
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

    this.onDragMove(this.getTranslateX());
  };
}
