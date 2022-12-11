import React from "react";

interface Props {
  as: any;
  className?: string;
  text?: string;
  id?: string;
  children?: any;
}

const Typography: React.FC<Props> = ({
  as: As,
  className,
  text,
  children,
  id,
}) => {
  return (
    <As className={className} id={id}>
      {text ? text : children}
    </As>
  );
};

export default Typography;
