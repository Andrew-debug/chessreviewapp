import styled from "styled-components";

interface Props {
  currentMoveNumber: number;
  index: number;
}

export const MoveWrap = styled.div`
  display: flex;
`;

export const Turn = styled.div`
  color: rgba(255, 255, 255, 0.5);
  margin-right: 5px;
  padding: 1px;
`;

export const Move = styled.div<Props>`
  position: relative;
  padding: 1px;
  margin-right: 4px;
  font-weight: 600;
  color: var(--white-primary-dim);
  cursor: pointer;
  z-index: 1;
  ::before {
    background-color: ${({ currentMoveNumber, index }) =>
      currentMoveNumber === index && "rgba(152,150,36, 0.5)"};
    border-bottom-style: solid;
    border-color: rgba(255, 255, 0, 0.4);
    border-radius: 2px;
    border-width: 0;
    border-bottom-width: ${({ currentMoveNumber, index }) =>
      currentMoveNumber === index && "3px"};
    content: "";
    height: 100%;
    left: 0;
    margin-left: -2px;
    position: absolute;
    top: 0;
    width: calc(100% + 4px);
    z-index: -1;
  }
`;
