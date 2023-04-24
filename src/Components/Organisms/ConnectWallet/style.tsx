import styled from "styled-components";

export const Wrapper = styled.main`
  background-image: url("/assets/images/no-wallet-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom left;
  background-attachment: fixed;

  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const Container = styled.section`
  width: 60rem;
  position: relative;
  padding-top: 8rem;

  .glass-card {
    /* margin-top: 9rem; */
    position: absolute;
    width: 100%;
    height: 35rem;
    background: rgba(255, 255, 255, 0.16);
    box-shadow: 0 0.4rem 2rem rgba(65, 65, 65, 0.4),
      inset 0 -4rem 4rem rgba(0, 0, 0, 0.2);
    border-radius: 4rem;
  }

  .card {
    position: absolute;
    /* top: 7rem; */
    width: 70%;
    left: 15%;
    transform: translateY(7rem);

    background-color: var(--color-white);
    box-shadow: 0px 100px 70px rgba(10, 10, 10, 0.22);
    border-radius: 20px;
    padding: 5rem 2.5rem;
    margin-inline: auto;
  }

  .btn-no-wallet {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    text-decoration: none;

    background-color: var(--color-white);
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.07);
    border-radius: 2rem;
    padding: 1.3rem 0.5rem;

    img {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;
