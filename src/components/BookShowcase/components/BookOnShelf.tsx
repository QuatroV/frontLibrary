import { FC } from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { addBookToShelf } from "../../../api/shelfAPI";
import { BookDescription } from "../../../globalTypes";

interface IBookOnShelf {
  book: BookDescription;
  email: string;
  addToShelfButton?: boolean;
  goToReadButton?: boolean;
}

const BookOnShelf: FC<IBookOnShelf> = ({
  book,
  email,
  addToShelfButton,
  goToReadButton,
}) => {
  const handleAddToShelf = async () => {
    addBookToShelf(email, book.id);
  };
  return (
    <StyledCard key={book.id}>
      <Card.Header>
        <Card.Title>
          {book.title}, {book.author}
        </Card.Title>
      </Card.Header>
      <MainPartWrapper>
        <Card.Text>{book.description}</Card.Text>
        {addToShelfButton && (
          <Button variant="primary" onClick={handleAddToShelf}>
            Добавить на полку
          </Button>
        )}
        {goToReadButton && <Button variant="primary">Читать</Button>}
      </MainPartWrapper>
    </StyledCard>
  );
};

const MainPartWrapper = styled.div`
  padding: 14px;
`;

const StyledCard = styled(Card)`
  flex: 1;
  :not(:last-child) {
    margin-right: 20px;
  }
  max-width: 400px;
  min-width: 250px;
  margin-top: 20px;
  flex-grow: 10;
`;

export default BookOnShelf;
