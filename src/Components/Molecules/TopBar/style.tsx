import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FlexRowAiCenter,
  FlexRowJcBetweenAiCenter,
} from "Styles/Abstract/Mixins";

export const Wrapper = styled(motion.div)`
  ${FlexRowAiCenter};
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
