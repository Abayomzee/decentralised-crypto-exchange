import { keyframes } from "styled-components";

// Keyframes
export const rotate = keyframes`
0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`;

// Framer animations
export const animate_slideUp = {
  variants: {
    hidden: { y: 20, opacity: 0, transition: { duration: 0.3 } },
    visible: { y: 0, opacity: 1 },
  },
  transition: { ease: "easeOut", duration: 0.6 },
};
