import React from "react";

interface Props {
  width?: string;
  height?: string;
  className?: string;
  childClassName?: string;
}
const PolygonNetwork: React.FC<Props> = (props) => {
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
      <rect width="20" height="20" rx="3" fill="#04082E" />
      <path
        d="M6.774 6.31C7.98733 5.92 9.21367 5.725 10.453 5.725C11.6923 5.725 12.6457 5.933 13.313 6.349C13.469 6.817 13.547 7.26333 13.547 7.688C13.547 8.68467 13.1353 9.521 12.312 10.197C11.4887 10.8643 10.427 11.3453 9.127 11.64L8.815 14.552L7.515 14.682L6.774 6.31ZM11.038 8.065C11.038 7.39767 10.765 6.89933 10.219 6.57C10.063 6.57 9.87233 6.60033 9.647 6.661L9.218 10.756C9.78133 10.444 10.2233 10.041 10.544 9.547C10.8733 9.053 11.038 8.559 11.038 8.065Z"
        fill="white"
      />
    </svg>
  );
};

export default PolygonNetwork;
