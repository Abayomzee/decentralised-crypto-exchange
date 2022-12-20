import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.main)`
  /* height: 100vh; */
  overflow-y: auto;
  background-color: var(--color-2);
  flex-grow: 1;
  padding: 2.5rem 1.5rem;
`;
