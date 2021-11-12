import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { Book } from "../../globalTypes";
import { getBook, getBookText } from "../../api/bookAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Spinner } from "react-bootstrap";
import BookmarkContainer from "./components/BookmarkContainer";
import dotsIcon from "../../pictures/dots.png";

const ReadPage: FC = () => {
  const [text, setText] = useState<string>("");
  const [bookInfo, setBookInfo] = useState<Omit<Book, "text">>();

  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const currentBook = useSelector((state: RootState) => state.book);

  const [showSidebar, setShowSidebar] = useState(true);

  const fetchBookTextAndInfo = async () => {
    if (!currentBook.currentBookId) return null;
    setLoading(true);
    const { bookInfo } = await getBook(currentBook.currentBookId);
    const textFromServer = await getBookText(
      user.email,
      currentBook.currentBookId
    );
    setText((prevState) => prevState.concat(textFromServer));
    setBookInfo(bookInfo[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookTextAndInfo();
  }, [user]);

  const bookText = document.querySelector("#readContainer") as HTMLElement;

  const calcProgress = () => {
    if (!bookText) return 0;
    const currentPosition = bookText.scrollTop;
    const maxPosition = bookText.scrollHeight - bookText.clientHeight;
    const progressOfReading = (currentPosition / maxPosition) * 100;
    return progressOfReading;
  };

  return (
    <StyledReadPageWrapper>
      {showSidebar ? (
        <BookmarkContainer
          email={user.email}
          book={bookInfo}
          getProgress={calcProgress}
          textElement={bookText}
          onHide={() => setShowSidebar(false)}
        />
      ) : (
        <StyledImg src={dotsIcon} onClick={() => setShowSidebar(true)} />
      )}
      <StyledReadWrapper id="readContainer">
        {loading ? (
          <Spinner animation="border" role="status" />
        ) : (
          <StyledTextWrapper>{text}</StyledTextWrapper>
        )}
      </StyledReadWrapper>
    </StyledReadPageWrapper>
  );
};

const StyledImg = styled.img`
  cursor: pointer;
  height: 30px;
  margin-right: 10px;
`;

const StyledReadPageWrapper = styled.div`
  display: flex;
  margin: 20px 20%;
  align-items: flex-start;
`;

const StyledTextWrapper = styled.div`
  white-space: pre-line;
`;

const StyledReadWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  align-items: center;
  padding: 20px;
  overflow: auto;
  max-height: 89vh;
`;

export default ReadPage;
