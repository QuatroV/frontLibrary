import { FC, useState } from "react";
import { Card, Button, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteBook } from "../../../api/bookAPI";
import { addBookToShelf, removeBookFromShelf } from "../../../api/shelfAPI";
import { BookDescription } from "../../../globalTypes";
import { updateCurentBookId } from "../../../store/bookSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditModal from "./EditModal";

interface IBookOnShelf {
  book: BookDescription;
  email: string;
  addToShelfButton?: boolean;
  goToReadButton?: boolean;
  removeFromShelfButton?: boolean;
  editable?: boolean;
  onUpdateBooks?: () => void;
}

const BookOnShelf: FC<IBookOnShelf> = ({
  book,
  email,
  addToShelfButton,
  goToReadButton,
  editable,
  onUpdateBooks,
  removeFromShelfButton,
}) => {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleAddToShelf = async () => {
    await addBookToShelf(email, book.id);
    if (onUpdateBooks) {
      onUpdateBooks();
    }
  };

  const dispatch = useDispatch();

  const handleGoToRead = () => {
    dispatch(updateCurentBookId({ bookId: book.id }));
  };

  const hasDropdown = Boolean(editable);

  const handleRemoveFromShelf = async () => {
    await removeBookFromShelf(book.id, email);
    if (onUpdateBooks) {
      onUpdateBooks();
    }
  };

  return (
    <>
      <ConfirmDeleteModal
        isVisible={showConfirmDeleteModal}
        onHide={() => setShowConfirmDeleteModal(false)}
        book={book}
        onUpdateBooks={onUpdateBooks}
      />
      <EditModal
        isVisible={showEditModal}
        onHide={() => setShowEditModal(false)}
        book={book}
        onUpdateBooks={onUpdateBooks}
      />
      <StyledCard key={book.id}>
        <StyledCardHeader>
          <StyledCardTitle>
            {book.title}, {book.author}
          </StyledCardTitle>
          {hasDropdown && (
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="outline-secondary"
                id="dropdown-basic"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShowEditModal(true)}>
                  Изменить информацию о книге
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setShowConfirmDeleteModal(true)}>
                  Удалить книгу
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </StyledCardHeader>
        <MainPartWrapper>
          <Card.Text>{book.description}</Card.Text>
          <div>
            {addToShelfButton && (
              <StyledButton variant="primary" onClick={handleAddToShelf}>
                Добавить на полку
              </StyledButton>
            )}
            {goToReadButton && (
              <Link to="/read" onClick={handleGoToRead}>
                <StyledButton variant="primary">Читать</StyledButton>
              </Link>
            )}
            {removeFromShelfButton && (
              <StyledButton
                variant="outline-danger"
                onClick={handleRemoveFromShelf}
              >
                Убрать с полки
              </StyledButton>
            )}
          </div>
        </MainPartWrapper>
      </StyledCard>
    </>
  );
};

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const MainPartWrapper = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StyledCard = styled(Card)`
  flex: 1;
  :not(:last-child) {
    margin-right: 20px;
  }
  max-width: 400px;
  min-width: 335px;
  margin-top: 20px;
  flex-grow: 10;
`;

const StyledCardHeader = styled(Card.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCardTitle = styled(Card.Title)`
  margin-bottom: 0px;
  margin-right: 20px;
`;

export default BookOnShelf;
