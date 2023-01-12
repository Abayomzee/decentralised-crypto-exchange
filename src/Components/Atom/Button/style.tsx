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

    &-md {
      padding: 0.8rem 2rem;
    }

    /* Types */

    &-bordered {
      border: 1px solid var(--color-6);
      color: var(--color-6);
      background-color: transparent;
      border-radius: 0.8rem;
      font-weight: 500;
    }
  }
`;
