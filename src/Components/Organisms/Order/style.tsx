import styled from "styled-components";
import { Button } from "Styles/Components/Button";
import {
  FlexRowAiCenter,
  FlexRowJcBetweenAiCenter,
} from "Styles/Abstract/Mixins";

export const Wrapper = styled("div")`
  padding: 2rem 0 2rem;
`;

export const Section = styled("section")`
  padding: 2rem 0 2rem;
  border-bottom: 0.1rem solid var(--color-7);
`;

export const TabNavs = styled("div")`
  ${FlexRowAiCenter};
  background-color: var(--color-9);
  border-radius: 0.5rem;
`;

export const TabNav = styled<any>(Button)`
  padding: 0.8rem 2rem;
  background-color: ${(props) =>
    props.active ? "var(--color-6)" : "transparent"};
  color: var(--color-white);
  border-radius: 0.4rem;
  transition: 0.4s;
`;

export const TokenDetails = styled<any>("div")`
  ${FlexRowJcBetweenAiCenter};
  gap: 1rem;
`;

export const TokenDetail = styled<any>("div")`
  flex-grow: 1;
`;
