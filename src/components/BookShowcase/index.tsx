import { FC } from "react";
import styled from "styled-components";

import { Card, Button } from "react-bootstrap";
import { BookDescription } from "../../globalTypes";
import { addBookToShelf } from "../../api/shelfAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import BookOnShelf from "./components/BookOnShelf";

interface IBookShowcase {
  books?: Array<BookDescription>;
  addToShelfButton?: boolean;
  goToReadButton?: boolean;
  editable?: boolean;
  onUpdateBooks?: () => void;
}

const BookShowcase: FC<IBookShowcase> = ({
  books,
  addToShelfButton,
  goToReadButton,
  editable,
  onUpdateBooks,
}) => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <StyledShowcase>
      {books?.map((book) => (
        <BookOnShelf
          book={book}
          email={user.email}
          addToShelfButton={addToShelfButton}
          goToReadButton={goToReadButton}
          editable={editable}
          onUpdateBooks={onUpdateBooks}
        ></BookOnShelf>
      ))}
    </StyledShowcase>
  );
};

const StyledShowcase = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 20px;
  padding: 0px 20px 20px;
`;

export default BookShowcase;
