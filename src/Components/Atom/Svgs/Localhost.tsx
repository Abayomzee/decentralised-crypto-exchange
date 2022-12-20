import React from "react";

interface Props {
  width?: string;
  height?: string;
  className?: string;
  childClassName?: string;
}
const Localhost: React.FC<Props> = (props) => {
  // Props
  const { width, height, className } = props;
  return (
    <svg
      width={width || "20"}
      height={height || "20"}
      className={className ? className : ""}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="20" height="20" rx="3" fill="#1d245e" />
      <path
        d="M13.143 14.5L8.32 14.617L7.709 6.05L10.803 5.855L9.867 13.564L13.195 13.161L13.143 14.5Z"
        fill="white"
      />
    </svg>
  );
};

export default Localhost;
