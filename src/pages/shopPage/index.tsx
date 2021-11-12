import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import LibraryCarousel from "./components/LibraryCarousel";
import BookShowcase from "../../components/BookShowcase";
import { getAllBooksNamesAuthorsAndDescriptions } from "../../api/bookAPI";
import ButtonPanel from "./components/ButtonPanel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setFilteredShopShowcase,
  setShopShowcase,
} from "../../store/bookSlice";

const MainPage: FC = () => {
  const books = useSelector(
    (state: RootState) => state.book.filteredShopShowcase
  );

  const dispatch = useDispatch();

  const fetchBooks = async () => {
    const booksFromServer = await getAllBooksNamesAuthorsAndDescriptions();
    dispatch(setShopShowcase({ bookDescriptions: booksFromServer }));
    dispatch(setFilteredShopShowcase({ bookDescriptions: booksFromServer }));
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
