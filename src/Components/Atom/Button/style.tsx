import styled from "styled-components";
import { Button } from "Styles/Components/Button";

export const Wrapper = styled(Button)`
  &.btn {
    /* Type */
    &-1 {
      background-color: var(--color-6);
      color: var(--color-white);
      border-radius: 0.4rem;
      padding: 1.1rem 3rem;
    }

    /* Sizes */
    &-full {
      width: 100%;
    }
  }
`;
