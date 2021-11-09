import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import LibraryCarousel from "./components/LibraryCarousel";
import BookShowcase from "../../components/BookShowcase";
import { BookDescription } from "../../globalTypes";
import { getAllBooksNamesAuthorsAndDescriptions } from "../../api/bookAPI";

const MainPage: FC = () => {
  const [books, setText] = useState<BookDescription[]>([]);

  const fetchBooks = async () => {
    const booksFromServer = await getAllBooksNamesAuthorsAndDescriptions();
    setText((prevState) => prevState.concat(booksFromServer));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <LibraryCarousel />
      <BookShowcase books={books} addToShelfButton />
    </div>
  );
};

export default MainPage;
