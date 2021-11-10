import { FC, ReactNode } from "react";
import styled from "styled-components";
import { Book } from "../../../globalTypes";
import { Button, CloseButton } from "react-bootstrap";
import { addBookmarkToShelfItem, getBookmark } from "../../../api/shelfAPI";

interface IBookmarkContainer {
  book?: Omit<Book, "text">;
  email: string;
  getProgress: () => number;
  textElement: HTMLElement;
  onHide: () => void;
}

const BookmarkContainer: FC<IBookmarkContainer> = ({
  book,
  email,
  getProgress,
  textElement,
  onHide,
}) => {
  if (!book) return null;

  const handleAddBookmark = async () => {
    const shelfItemFromServer = await addBookmarkToShelfItem(
      getProgress(),
      book.id,
      email
    );
  };

  const handleGetToBookmark = async () => {
    const progress = await getBookmark(book.id, email);
    const maxPosition = textElement.scrollHeight - textElement.clientHeight;
    textElement.scrollTop = (progress * maxPosition) / 100;
    console.log(textElement.scrollTop, progress, maxPosition);
  };

  return (
    <StyledBookmarkContainer>
      <StyledTitleContainer>
        <StyledTitle>{book.title}</StyledTitle>
        <CloseButton onClick={onHide} />
      </StyledTitleContainer>
      <StyledAuthorInfo>{book.author}</StyledAuthorInfo>
      <hr />
      <StyledAnnotation>{book.annotation}</StyledAnnotation>
      <StyledButton onClick={handleAddBookmark}>
        {" "}
        Добавить закладку{" "}
      </StyledButton>
      <Button onClick={handleGetToBookmark}> Перейти к закладке </Button>
    </StyledBookmarkContainer>
  );
};

const StyledButton = styled(Button)`
  margin: 10px 0;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitle = styled.span`
  font-size: 20px;
`;

const StyledAuthorInfo = styled.span``;

const StyledAnnotation = styled.span`
  max-height: 20vh;
  overflow: auto;
  ::-webkit-scrollbar-track {
    display: none;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const StyledBookmarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin-right: 20px;
  border-radius: 0.25rem;
  min-width: 25%;
  padding: 20px;
`;

export default BookmarkContainer;
