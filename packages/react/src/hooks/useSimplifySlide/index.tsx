import { useRef } from "react";
import { UninitializedCoreError } from "@simplify-slider/core/errors";
import Core from "@simplify-slider/core";

const useSimplifySlide = () => {
  const core = useRef<Core>(null);

  const getCoreOrThrow = (): Core => {
    if (!core.current) {
      throw new UninitializedCoreError();
    }

    return core.current;
  };

  const next = () => getCoreOrThrow().next();
  const prev = () => getCoreOrThrow().prev();
  const goTo = (index: number) => getCoreOrThrow().goTo(index);
  const getCurrentIndex = () => getCoreOrThrow().getCurrentIndex();
  const getOptions = () => getCoreOrThrow().getOptions();

  return {
    core,
    next,
    prev,
    goTo,
    getCurrentIndex,
    getOptions,
  };
};

export default useSimplifySlide;
