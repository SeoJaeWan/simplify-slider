// import Core from "..";

// class Drag {
//   private core: Core;

//   private isDrag: boolean = false;
//   private startX: number = 0;
//   private currentX: number = 0;

//   constructor(core: Core) {
//     this.core = core;
//   }

//   public dragStart(e: MouseEvent) {
//     if (this.core.getIsLoading()) return;

//     this.isDrag = true;
//     this.startX = e.clientX;
//     this.currentX = e.clientX;

//     document.body.style.cursor = "grabbing";
//     document.body.style.userSelect = "none";
//     this.core.wrapper.style.transition = "none";

//     window.addEventListener("mousemove", this.dragMove);
//   }

//   public dragMove = (e: MouseEvent) => {
//     if (!this.isDrag) return;

//     // this.currentX = e.clientX;
//     // const width = this.getWrapperWidth();
//     // const diffX = this.startX - this.currentX;

//     // const prevX = this.getTranslateX() + width / 2;
//     // const nextX = this.getTranslateX() - width / 2;

//     // const dragX = this.getTranslateX() - diffX;

//     if (dragX >= prevX) {
//       //   if (!this.options.loop && this.currentIndex === this.min) {
//       //     this.updateSlide();
//       //   } else {
//       //     this.prev();
//       //   }
//       this.dragEnd();
//     } else if (dragX <= nextX) {
//       //   if (!this.options.loop && this.currentIndex === this.max) {
//       //     this.updateSlide();
//       //   } else {
//       //     this.next();
//       //   }
//       this.dragEnd();
//     } else {
//       //   this.updateTransform(this.getTranslateX() - diffX);
//     }
//   };

//   public dragEnd = () => {
//     this.isDrag = false;
//     this.startX = 0;
//     this.currentX = 0;

//     document.body.style.cursor = "auto";
//     document.body.style.userSelect = "auto";

//     // this.updateTransform(this.getTranslateX());
//     // window.removeEventListener("mousemove", this.dragMove);
//   };
// }

// export default Drag;
