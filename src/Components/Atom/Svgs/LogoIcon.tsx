import React from "react";

interface Props {
  width?: string;
  height?: string;
  className?: string;
  childClassName?: string;
}
const LogoIcon: React.FC<Props> = (props) => {
  // Props
  const { width, height, className } = props;
  return (
    <svg
      width={width || "22"}
      height={height || "22"}
      className={className ? className : ""}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="22" height="22" rx="3" fill="#2992F3" />
      <path
        d="M7.774 7.31C9.048 6.90267 10.2527 6.699 11.388 6.699C12.532 6.699 13.4637 6.87233 14.183 7.219C14.469 7.921 14.612 8.65333 14.612 9.416C14.612 10.4473 14.3607 11.431 13.858 12.367C13.364 13.303 12.6403 14.083 11.687 14.707C10.7423 15.3223 9.685 15.6473 8.515 15.682L7.774 7.31ZM12.298 10.3C12.298 9.66733 12.2027 9.104 12.012 8.61C11.83 8.116 11.5657 7.76933 11.219 7.57C11.063 7.57 10.8723 7.60033 10.647 7.661L9.932 14.59C10.712 14.2693 11.3013 13.7103 11.7 12.913C12.0987 12.107 12.298 11.236 12.298 10.3Z"
        fill="white"
      />
    </svg>
  );
};

export default LogoIcon;
