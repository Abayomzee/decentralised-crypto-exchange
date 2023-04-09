import React from "react";

interface Props {
  width?: string;
  height?: string;
  className?: string;
  childClassName?: string;
}
const SepoliaNetwork: React.FC<Props> = (props) => {
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
        d="M7.637 8.78C7.637 7.558 8.287 6.43133 9.587 5.4L11.966 6.986C10.8913 7.662 10.354 8.377 10.354 9.131C10.354 9.45167 10.4623 9.78967 10.679 10.145C10.8957 10.5003 11.1123 10.8513 11.329 11.198C11.5543 11.5447 11.667 11.8697 11.667 12.173C11.667 13.4297 10.8003 14.4003 9.067 15.085L8.443 14.24C8.86767 14.006 9.16233 13.7807 9.327 13.564C9.49167 13.3473 9.574 13.109 9.574 12.849C9.574 12.589 9.47 12.2987 9.262 11.978C9.06267 11.6487 8.84167 11.3497 8.599 11.081C8.365 10.8123 8.144 10.47 7.936 10.054C7.73667 9.638 7.637 9.21333 7.637 8.78Z"
        fill="white"
      />
    </svg>
  );
};

export default SepoliaNetwork;
