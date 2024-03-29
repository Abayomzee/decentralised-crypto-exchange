import React from "react";

interface Props {
  width?: string;
  height?: string;
  className?: string;
  childClassName?: string;
}
const SortIcon: React.FC<Props> = (props) => {
  // Props
  const { width, height, className } = props;
  return (
    <svg
      width={width || "30"}
      height={height || "20"}
      className={className ? className : ""}
      viewBox="0 0 30 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_18_9)">
        <path
          d="M11.6915 7.6H18.309C18.924 7.6 19.2313 6.8555 18.7975 6.422L15.49 3.00201C15.3549 2.86686 15.1783 2.79933 15.0018 2.79933C14.8254 2.79933 14.6495 2.86686 14.5155 3.00201L11.203 6.4225C10.7693 6.855 11.0764 7.6 11.6915 7.6ZM18.3075 9.2H11.6915C11.0765 9.2 10.7693 9.94425 11.203 10.378L14.5155 13.798C14.6475 13.9325 14.8025 14 15 14C15.1763 14 15.353 13.9324 15.4883 13.7973L18.7958 10.3773C19.23 9.945 18.9225 9.2 18.3075 9.2Z"
          fill="#767F92"
        />
      </g>
      <defs>
        <clipPath id="clip0_18_9">
          <rect
            width="8"
            height="12.8"
            fill="white"
            transform="translate(11 2)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SortIcon;
