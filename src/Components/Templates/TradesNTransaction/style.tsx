import styled from "styled-components";
import { motion } from "framer-motion";
import { FlexRow } from "Styles/Abstract/Mixins";
import { responsive } from "Styles/Abstract/Breakpoints";

export const Wrapper = styled(motion.main)`
  /* ${FlexRow}; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem;
  & > * {
    flex-grow: 1;
    height: 31rem;
    overflow: auto;
  }

  ${responsive(
    "lg",
    `
  grid-template-columns: repeat(1, 1fr);
  `
  )}
`;
