import { PropsWithChildren } from "react";

const SimplifySlide: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return <div>{children}</div>;
};

export default SimplifySlide;
