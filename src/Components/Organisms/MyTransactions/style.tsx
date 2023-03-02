import styled from "styled-components";
import { FlexRowAiCenter } from "Styles/Abstract/Mixins";
import { Button } from "Styles/Components/Button";

export const Wrapper = styled.section`
  background-color: var(--color-1);
  padding: 2rem;
  border-radius: 0.5rem;
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