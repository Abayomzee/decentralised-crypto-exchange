import styled from "styled-components";
import { motion } from "framer-motion";
import { Button } from "Styles/Components/Button";

export const Wrapper = styled(motion.div)`
  padding: 2rem;
  width: 25rem;
  background-color: var(--color-4);
  border-radius: 0.4rem;
  position: fixed;
  bottom: 3rem;
  right: 2rem;
  z-index: 3;
  box-shadow: 0 0 9rem rgba(4, 43, 134, 0.5);
`;

export const Close = styled(Button)`
  height: 2.5rem;
  width: 2.5rem;
  display: grid;
  color: var(--color-white);
  place-items: center;
  background-color: var(--color-4);
  border: 0.1rem dashed var(--color-white);
  border-radius: 50%;
  position: absolute;
  top: -1rem;
  left: -1rem;
  z-index: 3;
  font-size: 1rem;
`;
