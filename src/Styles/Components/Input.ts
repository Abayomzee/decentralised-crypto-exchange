import styled from "styled-components";

// General Button style
export const Input = styled.input`
  background-color: var(--color-3);
  border: none;
  font-family: inherit;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 1rem 7rem 0 rgba(0, 0, 0, 0.5);
  color: var(--color-5);

  &:active,
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--color-8);
    font-family: inherit;
  }

  /* Size types */
  &.md {
    padding: 1.3rem 1.1rem;
  }
`;
