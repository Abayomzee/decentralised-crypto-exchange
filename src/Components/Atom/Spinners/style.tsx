import styled from "styled-components";
import { motion } from "framer-motion";
import { rotate } from "Styles/Base/Animation";

export const Wrapper = styled(motion.div)`
  &.spinner {
    &-one {
      position: relative;
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 50%;
      animation: ${rotate} 0.6s linear infinite both;
      transform-origin: center center;
      background: linear-gradient(
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0)
      );

      display: grid;
      place-items: center;

      &:before {
        position: absolute;
        content: "";
        height: 1.2rem;
        width: 1.2rem;
        border-radius: 50%;
        background-color: var(--color-6);
      }
    }
  }
`;
