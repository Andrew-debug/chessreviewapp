import styled from "styled-components";
import { ISections } from "../types";

export const GamesContainer = styled.div`
  max-width: 500px;
  max-height: 800px;
  overflow-x: hidden;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

interface ISectionStyles {
  sections: ISections;
  name: keyof ISections;
}

export const Section = styled.button<ISectionStyles>`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ sections, name }: ISectionStyles) =>
    sections[name] ? "1px solid var(--green-dark)" : "none"};
  border-top: none;
  border-left: none;
  flex-basis: 33.33%;
  width: 33.33%;
  height: 50;
  padding: 8px 0 10px;
  margin: 0 2px;
  box-shadow: ${({ sections, name }) =>
    sections[name] && "0px 2px 1px var(--green-dark)"};
  background-color: ${({ sections, name }) =>
    sections[name] ? "var(--green)" : "var(--gray)"};
  color: ${({ sections, name }) =>
    sections[name] ? "var(--white-primary)" : "var(--button-active)"};
  font-weight: ${({ sections, name }) => (sections[name] ? 500 : 400)};

  font-size: 14px;
`;
