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

export const ActiveUserData = styled.div`
  display: flex;
  height: 40;
  margin-bottom: 10px;
  color: var(--white-primary);
  margin: 5px 0 5px 46px;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
`;

export const HorizontalMoveList = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 230px;
  max-height: 500px;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px 15px;
  font-size: 14px;
`;

export const GameHistoryDate = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 95%;
  margin-left: 10;
  ::before {
    content: "";
    position: absolute;
    top: 20px;
    right: -10px;
    width: 150px;
    height: 1px;
    background-color: var(--silver);
  }
`;

export const LoaderWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomErrorStyles = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface IImgWrap {
  width: number;
  height: number;
}
export const ImgWrap = styled.div<IImgWrap>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
