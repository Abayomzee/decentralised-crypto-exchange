import styled from "styled-components";
import { FlexRow } from "Styles/Abstract/Mixins";

export const Wrapper = styled.section`
  background-color: var(--color-1);
  padding: 2rem;
  border-radius: 0.5rem;
`;

export const OrderTypesWrapper = styled.section`
  ${FlexRow};
  gap: 1rem;
`;

export const OrderTypeCard = styled.div`
  flex-grow: 1;
`;
