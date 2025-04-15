import type { PropsWithChildren } from "react";
import "../../../css/simplifySlide.css";

const SimplifySlide: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return <li className={"simplify-slide"}>{children}</li>;
};

SimplifySlide.displayName = "SimplifySlide";

export default SimplifySlide;
