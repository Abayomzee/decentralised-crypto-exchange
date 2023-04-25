import styled from "styled-components";
import { motion } from "framer-motion";
import { responsive } from "Styles/Abstract/Breakpoints";

export const Wrapper = styled(motion.aside)`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background-color: var(--color-1);
  flex-basis: 39rem;
  padding: 3.5rem 1.5rem 2.5rem;

  ${responsive(
    "md",
    `
  display: none;
  `
  )}

  &.side-menu {
    z-index: 500;
    width: 95vw;
    display: block;
    position: fixed;
  }
`;

export const MarketSelector = styled(motion.div)`
  padding: 6rem 0 2rem;
  margin-top: 5rem;
  border-bottom: 0.1rem solid var(--color-7);
`;
