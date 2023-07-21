import styled from "styled-components";

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 180px;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  background-color: var(--green);
  font-weight: 500;
  text-shadow: 0 1px 0 var(--green-dark, rgba(0, 0, 0, 0.2)),
    0 0.3rem 1.6rem rgba(0, 0, 0, 0.05);
`;

const PrimaryButton = ({
  text,
  handleClick,
}: {
  text: string;
  handleClick: () => void;
}) => {
  return <Button onClick={handleClick}>{text}</Button>;
};

export default PrimaryButton;
