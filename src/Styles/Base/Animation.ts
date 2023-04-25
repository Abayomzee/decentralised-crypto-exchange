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
    hidden: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.7 },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        // delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  },
  transition: {
    ease: "easeOut",
    duration: 0.6,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

export const animate_slideRight = {
  variants: {
    hidden: {
      x: -20,
      opacity: 0,
      transition: { duration: 0.7 },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        // delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  },
  transition: {
    ease: "easeOut",
    duration: 0.6,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};
