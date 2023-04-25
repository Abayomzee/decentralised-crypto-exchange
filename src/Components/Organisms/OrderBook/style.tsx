import styled from "styled-components";
import { responsive } from "Styles/Abstract/Breakpoints";
import { FlexRow } from "Styles/Abstract/Mixins";

export const Wrapper = styled.section`
  background-color: var(--color-1);
  padding: 2rem;
  border-radius: 0.5rem;
`;

export const OrderTypesWrapper = styled.section`
  ${FlexRow};
  gap: 1rem;

  ${responsive(
    "md",
    `
  flex-direction: column;
  gap: 3rem;
  `
  )}
`;

export const OrderTypeCard = styled.div`
  flex-grow: 1;

  ${responsive(
    "md",
    `
  flex-basis: 100%;
  `
  )}
`;
