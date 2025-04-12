export class WrapperEmptyError extends Error {
  constructor() {
    super("MoveScroll: wrapper has no children.");
    this.name = "WrapperEmptyError";
  }
}
