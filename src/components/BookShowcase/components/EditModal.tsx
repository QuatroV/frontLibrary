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
import { getBook, updateBookInfo } from "../../../api/bookAPI";
import { BookDescription } from "../../../globalTypes";

interface IEditModal {
  isVisible: boolean;
  onHide: () => void;
  onUpdateBooks?: () => void;
  book: BookDescription;
}

const EditModal: FC<IEditModal> = ({
  isVisible,
  onHide,
  onUpdateBooks,
  book,
}) => {
  const [alertText, setAlertText] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [annotation, setAnnotation] = useState("");

  const fetchBookInfo = async () => {
    const { bookInfo } = await getBook(book.id);
    if (!bookInfo) return null;
    const {
      title: titleFromServer,
      author: authorFromServer,
      description: descriptionFromServer,
      annotation: annotationFromServer,
    } = bookInfo[0];
    setTitle(titleFromServer);
    setAuthor(authorFromServer);
    setDescription(descriptionFromServer);
    setAnnotation(annotationFromServer);
  };

  useEffect(() => {
    fetchBookInfo();
  }, [isVisible]);

  const handleSubmit = async () => {
    try {
      await updateBookInfo(book.id, title, author, description, annotation);
      if (onUpdateBooks) {
        onUpdateBooks();
      }
      onHide();
    } catch (e: any) {
      setAlertText(e.response.data.message);
    }
  };

  return (
    <Modal show={isVisible} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Изменить информацию о книге</Modal.Title>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Сохранить новую информацию о книге
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const StyledInputGroup = styled(InputGroup)`
  margin-bottom: 20px;
`;

export default EditModal;
