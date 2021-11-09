import { FC, useState } from "react";
import { Button, ButtonGroup, Form, FormControl } from "react-bootstrap";
import styled from "styled-components";
// @ts-ignore
import AddBookModal from "./AddBookModal";

interface IButtonPanel {
  onUpdateBooks: () => void;
}

const ButtonPanel: FC<IButtonPanel> = ({ onUpdateBooks }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <StyledButtonPanel>
      {showModal && (
        <AddBookModal
          isVisible={showModal}
          onHide={() => setShowModal(false)}
          onUpdateBooks={onUpdateBooks}
        />
      )}
      <StyledButtonGroup className="mb-2">
        <Button variant="secondary" onClick={() => setShowModal(true)}>
          Добавить книгу в библиотеку
        </Button>
      </StyledButtonGroup>
      <StyledForm className="d-flex">
        <FormControl
          type="search"
          placeholder="Поиск"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Найти</Button>
      </StyledForm>
    </StyledButtonPanel>
  );
};

const StyledButtonGroup = styled(ButtonGroup)`
  margin-right: 8px;
`;

const StyledForm = styled(Form)`
  height: 38px;
`;

const StyledButtonPanel = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 20px 0;
`;

export default ButtonPanel;
