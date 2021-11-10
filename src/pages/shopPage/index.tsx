import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import LibraryCarousel from "./components/LibraryCarousel";
import BookShowcase from "../../components/BookShowcase";
import { BookDescription } from "../../globalTypes";
import { getAllBooksNamesAuthorsAndDescriptions } from "../../api/bookAPI";
import ButtonPanel from "./components/ButtonPanel";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const MainPage: FC = () => {
  const [books, setBooks] = useState<BookDescription[]>([]);

  const fetchBooks = async () => {
    const booksFromServer = await getAllBooksNamesAuthorsAndDescriptions();
    setBooks(booksFromServer);
  };

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <LibraryCarousel />
      <ButtonPanel onUpdateBooks={fetchBooks} />
      <BookShowcase
        books={books}
        onUpdateBooks={fetchBooks}
        addToShelfButton
        editable={user.role === "ADMIN"}
      />
    </div>
  );
};

export default MainPage;
