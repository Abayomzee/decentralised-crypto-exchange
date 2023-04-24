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

    &-2 {
      background-color: var(--color-16);
      color: var(--color-white);
      padding: 1.35rem 3rem;
      box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.07);
      border-radius: 0.6rem;
    }

    /* Sizes */
    &-full {
      width: 100%;
    }

    &-md {
      padding: 0.8rem 2rem;
    }

    &-sm {
      padding: 0.3rem 1.1rem;
    }

    /* Types */
    &-bordered {
      border: 1px solid var(--color-6);
      color: var(--color-6);
      background-color: transparent;
      border-radius: 0.8rem;
      font-weight: 500;
    }

    &-no-wallet {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      background-color: var(--color-white);
      box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.07);
      border-radius: 2rem;
      padding: 1rem 0.5rem;

      img {
        width: 1.8rem;
        height: 1.8rem;
      }
    }

    &-network {
      border-radius: 0.6rem;
      padding: 0.4rem 1.9rem;
      background-color: var(--color-white);
      color: var(--color-black);
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
`;
