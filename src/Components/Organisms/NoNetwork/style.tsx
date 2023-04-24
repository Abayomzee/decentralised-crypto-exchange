import styled from "styled-components";

export const Wrapper = styled.main`
  background-color: var(--color-4);
  width: 100vw;
  height: 100vh;
  z-index: 100;
  position: fixed;
  top 0;
  right 0;
  bottom 0;
  left 0;

  display: grid;
  place-items: center
`;

export const Container = styled.div``;

export const AvailableNetworks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-width: 50rem;
  margin-top: 3rem;
`;
