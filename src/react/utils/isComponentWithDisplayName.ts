type MaybeDisplayNamedComponent = {
  displayName?: unknown;
};

const isComponentWithDisplayName = (type: unknown, name: string): boolean => {
  return (
    typeof type !== "string" &&
    typeof type === "function" &&
    "displayName" in type &&
    (type as MaybeDisplayNamedComponent).displayName === name
  );
};

export default isComponentWithDisplayName;
