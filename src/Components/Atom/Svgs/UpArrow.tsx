import React from "react";

interface Props {
  width?: string;
  height?: string;
  className?: string;
  childClassName?: string;
}
const UpArrow: React.FC<Props> = (props) => {
  // Props
  const { width, height, className } = props;
  return (
    <svg
      width={width || "22"}
      height={height || "14"}
      className={className ? className : ""}
      viewBox="0 0 22 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 2L12.2273 9.91667L8.13636 5.75L2 12"
        stroke="#25CE85"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 2H20V7"
        stroke="#25CE85"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UpArrow;
