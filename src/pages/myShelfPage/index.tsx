import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { BookDescription } from "../../globalTypes";
import { getAllBooksNamesAuthorsAndDescriptions } from "../../api/bookAPI";
import { getShelfBooks } from "../../api/shelfAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import BookShowcase from "../../components/BookShowcase";

const ShelfPage: FC = () => {
  const [books, setBooks] = useState<BookDescription[]>([]);

  const user = useSelector((state: RootState) => state.user);

  const fetchBooks = async () => {
    const booksFromServer = await getShelfBooks(user.email);
    setBooks((prevState) => prevState.concat(booksFromServer));
  };

  useEffect(() => {
    fetchBooks();
  }, [user]);

  return (
    <>
      <BookShowcase books={books} goToReadButton />
    </>
  );
};

export default ShelfPage;
