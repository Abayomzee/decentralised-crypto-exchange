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
  box-shadow: 0 0 10rem 0.1rem rgba(131, 163, 236, 0.5);

  .block-link {
    display: block;
    margin-inline: auto;
    margin-top: 0.8rem;
    /* text-decoration: none; */
    color: var(--color-12);
    transition: 0.4s;

    &:hover {
      color: var(--color-white);
    }
  }
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
