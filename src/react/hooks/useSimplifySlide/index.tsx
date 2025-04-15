import { useRef } from "react";
import { Simplify } from "../..";
import UninitializedCoreError from "../../../errors/uninitializedCoreError";

const useSimplifySlide = () => {
  const core = useRef<Simplify>(null);

  const getCoreOrThrow = (): Simplify => {
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
