class UninitializedCoreError extends Error {
  constructor() {
    super("Uninitialized core: Core instance is not initialized.");
    this.name = "UninitializedCoreError";
  }
}

export default UninitializedCoreError;
