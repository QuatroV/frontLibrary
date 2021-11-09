import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { BookDescription } from "../../globalTypes";
import {
  getAllBooksNamesAuthorsAndDescriptions,
  getBookText,
  getBookTextByPage,
} from "../../api/bookAPI";
import { getShelfBooks } from "../../api/shelfAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import BookShowcase from "../../components/BookShowcase";

const ReadPage: FC = () => {
  const [text, setText] = useState<string>("");

  const user = useSelector((state: RootState) => state.user);
  const currentBook = useSelector((state: RootState) => state.book);

  const fetchBookText = async () => {
    if (!currentBook.currentBookId) return null;
    const page = await getBookText(user.email, currentBook.currentBookId);
    setText((prevState) => prevState.concat(page));
  };

  useEffect(() => {
    fetchBookText();
  }, [user]);

  return (
    <StyledReadPageWrapper>
      <StyledTextWrapper>{text}</StyledTextWrapper>
    </StyledReadPageWrapper>
  );
};

const StyledTextWrapper = styled.div`
  white-space: pre-line;
`;

const StyledReadPageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 20px 20%;
  align-items: center;
  padding: 20px;
  overflow: auto;
  max-height: 89vh;
`;

export default ReadPage;
