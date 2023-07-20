import { ISections } from "../types";
import { Section } from "../styles/GameHistoryStyles";
import { useContext } from "react";
import { SectionContext } from "./GamesHisory";
const SectionButton = ({
  text,
  name,
}: {
  text: string;
  name: keyof ISections;
}) => {
  const { sections, setSections } = useContext(SectionContext);
  const resetSections = {
    byUsername: false,
    byDate: false,
    byLink: false,
  };
  return (
    <Section
      sections={sections}
      name={name}
      onClick={() =>
        setSections({
          ...resetSections,
          [name]: true,
        })
      }
    >
      {text}
    </Section>
  );
};

export default SectionButton;
