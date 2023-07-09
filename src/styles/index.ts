import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 420px;
  height: 100vh;
  background-color: var(--black-primary);
  max-width: 550px;
  max-height: 800px;
`;

export const GameLink = styled.a`
  color: var(--white-primary-dim);
  :hover {
    color: var(--button-hovered);
  }
`;
export const Bar = styled.div`
  position: relative;
  width: 26px;
  background-color: var(--black-primary);
  margin: 0 10px;
  overflow: hidden;
`;

export const BlackBar = styled.div`
  background-color: var(--white-primary);
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  transition: transform 1s ease-in;
  width: 100%;
  z-index: 1;
  transform: ${({ evalScore }: { evalScore: number }) =>
    `translate3d(0px, ${100 - (evalScore / 100 + 5) * 10}%, 0px)`};
`;

export const ActiveUserData = styled.div`
  height: 40;
  margin-bottom: 10px;
  color: var(--white-primary);
`;

export const HorizontalMoveList = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 230px;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px 15px;
  font-size: 14px;
`;
