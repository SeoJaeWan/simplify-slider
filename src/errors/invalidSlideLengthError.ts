class InvalidSlideLengthError extends Error {
  constructor() {
    super(`Invalid slide length: Length must be greater than 0.`);
    this.name = "InvalidSlideLengthError";
  }
}

export default InvalidSlideLengthError;
