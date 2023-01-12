import React from "react";

interface Props {
  width?: string;
  height?: string;
  className?: string;
  childClassName?: string;
}
const EthIcon: React.FC<Props> = (props) => {
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
    >
      <path
        opacity="0.2"
        d="M19.9457 10.0002C19.9457 15.494 15.4923 19.9476 9.99855 19.9476C4.50477 19.9476 0.051239 15.494 0.051239 10.0002C0.051239 4.50647 4.50477 0.0529327 9.99855 0.0529327C15.4922 0.0529327 19.9457 4.50647 19.9457 10.0002"
        fill="#505050"
      />
      <g opacity="0.8">
        <path
          d="M9.96674 5.38461L9.9053 5.59345V11.6533L9.96674 11.7146L12.7797 10.0519L9.96674 5.38461Z"
          fill="white"
        />
        <path
          d="M9.96675 5.38461L7.15384 10.0519L9.96675 11.7146V8.77338V5.38461Z"
          fill="white"
        />
        <path
          d="M9.96672 12.6298L9.9321 12.672V14.8307L9.96672 14.9318L12.7813 10.9679L9.96672 12.6298Z"
          fill="white"
        />
        <path
          d="M9.96675 14.9318V12.6298L7.15384 10.9679L9.96675 14.9318Z"
          fill="white"
        />
        <path
          d="M9.96674 11.7146L12.7796 10.0519L9.96674 8.77341V11.7146Z"
          fill="white"
        />
        <path
          d="M7.15384 10.0519L9.96671 11.7146V8.77338L7.15384 10.0519Z"
          fill="white"
        />
      </g>
    </svg>
  );
};

export default EthIcon;