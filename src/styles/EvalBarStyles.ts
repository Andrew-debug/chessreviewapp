import styled from "styled-components";

export const Bar = styled.div`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  width: 26px;
  background-color: var(--black-primary);
  margin: 0 10px;
  overflow: hidden;
`;

export const WhiteBar = styled.div`
  position: absolute;
  z-index: 2;
  font-size: 11px;
  font-weight: 600;
  color: var(--white-primary);
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
  transform: ${({ filteredEval }: { filteredEval: number }) =>
    `translate3d(0px, ${(500 - filteredEval) / 10}%, 0px)`};
`;
interface EvalNumbersProps {
  filteredEval: number;
}
export const EvalNumbers = styled.div<EvalNumbersProps>`
  position: absolute;
  top: ${({ filteredEval }) => (filteredEval <= 0 ? "5px" : "680px")};
  left: 6px;
  color: ${({ filteredEval }) =>
    filteredEval <= 0 ? "var(--white-primary)" : "var(--black-primary)"};
`;
