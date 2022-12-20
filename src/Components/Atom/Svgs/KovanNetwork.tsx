import React from "react";

interface Props {
  width?: string;
  height?: string;
  className?: string;
  childClassName?: string;
}
const KovanNetwork: React.FC<Props> = (props) => {
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
        d="M13.625 6.739L10.882 9.612L14.093 14.487L11.337 14.682L9.582 10.977L9.296 11.276L8.945 14.552L7.515 14.682L6.774 6.05L9.868 5.855L9.452 9.781L12.468 5.855L13.625 6.739Z"
        fill="white"
      />
    </svg>
  );
};

export default KovanNetwork;
