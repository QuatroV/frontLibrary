import { FC, useState, useEffect } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Tabs,
  Tab,
  Alert,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addNewBook } from "../../../../api/bookAPI";
import { registration, login } from "../../../../api/userAPI";
import { RootState } from "../../../../store/store";
import { updateEmailAndRole } from "../../../../store/userSlice";

interface IAddBookModal {
  isVisible: boolean;
  onHide: () => void;
  onUpdateBooks: () => void;
}

const AddBookModal: FC<IAddBookModal> = ({
  isVisible,
  onHide,
  onUpdateBooks,
}) => {
  const [alertText, setAlertText] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [text, setText] = useState<any>();

  const handleSubmit = async () => {
    try {
      await addNewBook(title, author, description, annotation, text);
      onUpdateBooks();
      onHide();
    } catch (e: any) {
      setAlertText(e.response.data.message);
    }
  };

  return (
    <Modal show={isVisible} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Добавить новую книгу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertText && (
          <Alert variant="danger" onClose={() => setAlertText("")} dismissible>
            <Alert.Heading>Ошибка!</Alert.Heading>
            {alertText}
          </Alert>
        )}
        <InputGroup className="mb-3">
          <FormControl
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <FormControl
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Автор"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <StyledInputGroup>
          <FormControl
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </StyledInputGroup>
        <InputGroup>
          <FormControl
            as="textarea"
            value={annotation}
            onChange={(e) => setAnnotation(e.target.value)}
            placeholder="Аннотация"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Текст книги:</Form.Label>
          <Form.Control
            onChange={(e: any) => setText(e.target.files[0])}
            type="file"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Добавить книгу
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const StyledInputGroup = styled(InputGroup)`
  margin-bottom: 20px;
`;

export default AddBookModal;
