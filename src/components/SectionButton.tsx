import { ISections } from "../types";
import { Section } from "../styles/GameHistoryStyles";
const SectionButton = ({
  sections,
  setSections,
  text,
  name,
}: {
  sections: ISections;
  setSections: (v: ISections) => void;
  text: string;
  name: keyof ISections;
}) => {
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
