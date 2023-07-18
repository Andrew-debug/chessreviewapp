import styled from "styled-components";

export const ArchivedGameContainer = styled.div`
  background-color: var(--black-primary);
  color: var(--white-primary);
`;

export const GameWrap = styled.div`
  position: relative;
  margin: 10px;
  cursor: pointer;
  border: 1px solid var(--gray);
`;
interface Props {
  whiteResult?: string;
  blackResult?: string;
}
export const WhiteSquare = styled.div<Props>`
  border-radius: 2px;
  display: block;
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border: 1px solid #bebdb9;
  background-color: var(--white-primary);
  border: ${({ whiteResult }) => whiteResult === "win" && "2px solid #96bc4b"};
`;
export const BlackSquare = styled.div<Props>`
  border-radius: 2px;
  display: block;
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  background-color: var(--gray);
  border: ${({ blackResult }) => blackResult === "win" && "2px solid #96bc4b"};
`;
export const WinComponent = styled.div`
  position: relative;
  background-color: var(--green);
  width: 16px;
  height: 16px;
  border-radius: 3px;
  span {
    position: absolute;
    top: -13px;
    left: 1px;
    color: black;
    font-size: 20px;
    font-weight: 600;
    transform: translateY(5px);
  }
`;
export const LoseComponent = styled.div`
  position: relative;
  background-color: var(--red);
  width: 16px;
  height: 16px;
  border-radius: 3px;
  span {
    position: absolute;
    top: -13px;
    left: 3px;
    color: black;
    font-size: 20px;
    font-weight: 600;
    transform: translateY(5px);
  }
`;
export const DrawComponent = styled.div`
  position: relative;
  background-color: var(--silver);
  width: 16px;
  height: 16px;
  border-radius: 3px;
  span {
    position: absolute;
    top: -14px;
    left: 1px;
    color: black;
    font-size: 20px;
    font-weight: 600;
    transform: translateY(5px);
  }
`;

export const Unsupported = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--white-primary);
  opacity: 0.9;
  cursor: default;
  p {
    color: var(--black-primary);
    font-size: 24px;
    cursor: default;
  }
`;
