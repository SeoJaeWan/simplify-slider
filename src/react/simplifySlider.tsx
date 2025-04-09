import { PropsWithChildren } from "react";

export interface SimplifySliderProps extends PropsWithChildren {
  pagination?: boolean;
}

const SimplifySlider: React.FC<SimplifySliderProps> = (props) => {
  const { children, pagination } = props;

  console.error(pagination);

  return <div>{children}</div>;
};

export { SimplifySlider };
