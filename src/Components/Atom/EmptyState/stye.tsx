import styled from "styled-components";

export const Wrapper = styled.div<{ space?: string }>`
  padding: ${({ space }) => (space ? `${space} 1rem` : "15rem 1rem")};

  display: grid;
  place-items: center;
`;
