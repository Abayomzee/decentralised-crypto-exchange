import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FlexColumn,
  FlexRowAiCenter,
  FlexRowJcBetweenAiCenter,
} from "Styles/Abstract/Mixins";
import { responsive } from "Styles/Abstract/Breakpoints";

export const Wrapper = styled(motion.div)`
  ${FlexRowAiCenter};
  flex-wrap: wrap;
  gap: 1.6rem;
`;

export const NetworkSelector = styled(motion.div)`
  ${FlexRowAiCenter};
  gap: 0.7rem;
`;

export const AccountWrapper = styled(motion.div)`
  ${FlexRowJcBetweenAiCenter};
  gap: 1rem;
  border-radius: 0.7rem;
  padding-left: 1.5rem;
  background-color: var(--color-3);
  margin-left: auto;

  ${responsive(
    "xsm",
    `
  margin-left: 0;  
  flex-grow: 1;
  `
  )}
`;

export const Balance = styled(motion.p)`
  ${FlexRowAiCenter};
  gap: 0.5rem;

  .small {
    color: var(--color-5);
  }
`;

export const Account = styled(motion.div)`
  ${FlexRowAiCenter};
  gap: 1rem;
  border-radius: 0.7rem;
  padding: 1rem 1.5rem;
  background-color: var(--color-4);

  a {
    display: inline-block;
    ${FlexRowAiCenter};
    gap: 1rem;
    text-decoration: none;
  }
`;

export const MenuBar = styled.div`
  ${FlexColumn};
  gap: 0.45rem;
  width: 2.5rem;
  cursor: pointer;
  display: none;
  span {
    width: 100%;
    height: 0.25rem;
    background-color: var(--color-6);
  }

  ${responsive(
    "md",
    `
  display: flex;
  `
  )}
`;
