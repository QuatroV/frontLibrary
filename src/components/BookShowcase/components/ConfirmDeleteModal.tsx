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
import { deleteBook } from "../../../api/bookAPI";
import { BookDescription } from "../../../globalTypes";

interface IConfirmDeleteModal {
  isVisible: boolean;
  onHide: () => void;
  onUpdateBooks?: () => void;
  book: BookDescription;
}

const ConfirmDeleteModal: FC<IConfirmDeleteModal> = ({
  isVisible,
  onHide,
  onUpdateBooks,
  book,
}) => {
  const [alertText, setAlertText] = useState("");

  const handleDelete = async () => {
    try {
      await deleteBook(book.id);
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
        <Modal.Title>Вы точно хотите удалить {book.title}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertText && (
          <Alert variant="danger" onClose={() => setAlertText("")} dismissible>
            <Alert.Heading>Ошибка!</Alert.Heading>
            {alertText}
          </Alert>
        )}
        Это действие будет нельзя отменить позже
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить удаление
        </Button>
        <Button variant="outline-danger" onClick={handleDelete}>
          Подтвердить удаление
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
