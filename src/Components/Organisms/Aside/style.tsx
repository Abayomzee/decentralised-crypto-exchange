import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.aside)`
  height: 100vh;
  overflow-y: auto;
  background-color: var(--color-1);
  flex-basis: 40rem;
  padding: 3.5rem 1.5rem 2.5rem;
`;

export const MarketSelector = styled(motion.div)`
  padding: 6rem 0 2rem;
  margin-top: 5rem;
  border-bottom: 0.1rem solid var(--color-7);
`;
