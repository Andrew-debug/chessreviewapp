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
  p {
    margin: 5px 0;
    color: var(--white-primary);
    span {
      font-weight: 600;
      color: var(--green-light);
    }
  }
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
  cursor: pointer;
  text-shadow: ${({ sections, name }) =>
    sections[name]
      ? "0 1px 0 var(--green-dark, rgba(0, 0, 0, 0.2)),0 0.3rem 1.6rem rgba(0, 0, 0, 0.05)"
      : "none"};
`;
