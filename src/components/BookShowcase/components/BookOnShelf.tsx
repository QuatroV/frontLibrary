import { FC, useState } from "react";
import { Card, Button, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteBook } from "../../../api/bookAPI";
import { addBookToShelf } from "../../../api/shelfAPI";
import { BookDescription } from "../../../globalTypes";
import { updateCurentBookId } from "../../../store/bookSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import dotsIcon from "../../../pictures/dots.png";

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

  const hasDropdown = Boolean(removeButton);

  return (
    <>
      <ConfirmDeleteModal
        isVisible={showModal}
        onHide={() => setShowModal(false)}
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
                {removeButton && (
                  <Dropdown.Item onClick={() => setShowModal(true)}>
                    Удалить книгу
                  </Dropdown.Item>
                )}
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
