import { css } from "styled-components";

export const Typography = css`
  body {
    font-family: "Poppins", sans-serif;
    font-size: 1.6rem;
    line-height: 1.7rem;
    font-weight: 500;
  }

  /* Headings */
  .heading {
    &-1 {
      font-weight: 500;
      font-size: 1.3rem;
      line-height: 100%;
      color: var(--color-white);
    }
    &-2 {
      font-weight: 400;
      font-size: 1.4rem;
      line-height: 100%;
      color: var(--color-white);
    }
    &-3 {
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 100%;
      color: var(--color-white);
    }
    &-4 {
      font-weight: 400;
      font-size: 1.2rem;
      line-height: 100%;
      color: var(--color-white);
    }
    &-5 {
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 100%;
      color: var(--color-white);
    }
    &-6 {
      font-weight: 400;
      font-size: 1.35rem;
      line-height: 100%;
      color: var(--color-white);
    }
    &-7 {
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 4.2rem;

      color: #222222;
      color: var(--color-13);
    }
  }

  /* Paragraphs */
  .paragraph {
    &-1 {
      font-weight: normal;
      font-size: 1.3rem;
      line-height: 100%;
      color: var(--color-white);
    }
    &-2 {
      font-size: 1.2rem;
      line-height: 110%;
      letter-spacing: 0.07rem;
      color: var(--color-5);
    }
    &-3 {
      font-size: 1.2rem;
      line-height: 100%;
      letter-spacing: 0.07rem;
      color: var(--color-5);
    }
    &-4 {
      font-weight: 400;
      font-size: 1.2rem;
      line-height: 100%;
      letter-spacing: 0.07rem;
      color: var(--color-8);
    }
    &-5 {
      font-weight: normal;
      font-size: 1.5rem;
      color: var(--color-13);
    }
    &-6 {
      font-style: normal;
      font-weight: 300;
      font-size: 1.3rem;
      line-height: 120%;
      color: var(--color-14);
    }
    &-7 {
      font-weight: 400;
      font-size: 1.3rem;
      line-height: 120%;
      color: var(--color-15);
    }
    &-8 {
      font-weight: 500;
      font-size: 1.3rem;
      line-height: 160%;
      color: var(--color-white);
    }
    &-9 {
      font-weight: 500;
      font-size: 1.3rem;
      line-height: 160%;
      color: var(--color-white);
    }
  }
`;
