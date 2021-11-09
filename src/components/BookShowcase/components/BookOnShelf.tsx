import { FC, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteBook } from "../../../api/bookAPI";
import { addBookToShelf } from "../../../api/shelfAPI";
import { BookDescription } from "../../../globalTypes";
import { updateCurentBookId } from "../../../store/bookSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface IBookOnShelf {
  book: BookDescription;
  email: string;
  addToShelfButton?: boolean;
  goToReadButton?: boolean;
  removeButton?: boolean;
  onUpdateBooks?: () => void;
}

const BookOnShelf: FC<IBookOnShelf> = ({
  book,
  email,
  addToShelfButton,
  goToReadButton,
  removeButton,
  onUpdateBooks,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToShelf = async () => {
    addBookToShelf(email, book.id);
    if (onUpdateBooks) {
      onUpdateBooks();
    }
  };

  const dispatch = useDispatch();

  const handleGoToRead = () => {
    dispatch(updateCurentBookId({ bookId: book.id }));
  };

  return (
    <>
      <ConfirmDeleteModal
        isVisible={showModal}
        onHide={() => setShowModal(false)}
        book={book}
        onUpdateBooks={onUpdateBooks}
      />
      <StyledCard key={book.id}>
        <Card.Header>
          <Card.Title>
            {book.title}, {book.author}
          </Card.Title>
        </Card.Header>
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
            {removeButton && (
              <StyledButton
                variant="outline-danger"
                onClick={() => setShowModal(true)}
              >
                Удалить книгу
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

export default BookOnShelf;
