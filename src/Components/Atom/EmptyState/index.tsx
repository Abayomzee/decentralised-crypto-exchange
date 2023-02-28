import React from "react";
import Typography from "Components/Atom/Typography";
import { Wrapper } from "./stye";

interface Props {
  text?: string;
  space?: string;
}
const EmptyState: React.FC<Props> = (props) => {
  // Props
  const { text, space } = props;
  // Data to render
  return (
    <Wrapper space={space}>
      <Typography as="h5" className="heading-5" text={text} />
    </Wrapper>
  );
};

export default EmptyState;
