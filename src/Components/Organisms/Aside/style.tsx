import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.aside)`
  height: 100vh;
  overflow-y: auto;
  background-color: var(--color-1);
  flex-basis: 30rem;
  padding: 2.5rem 1.5rem;
`;
