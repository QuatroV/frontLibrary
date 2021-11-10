import { BookDescription, ShelfItem } from "../globalTypes";
import { $authHost } from "./index";

export const addBookToShelf = async (email: string, bookId: number) => {
  const { data } = await $authHost.post<{ data: any }>(
    "api/shelf/addBookToShelf",
    { email, bookId }
  );
  return data;
};

export const getShelfBooks = async (email: string) => {
  const { data } = await $authHost.post<BookDescription[]>(
    "api/shelf/getShelfBooks",
    { email }
  );
  return data;
};

export const addBookmarkToShelfItem = async (
  progress: number,
  bookId: number,
  email: string
) => {
  const data = await $authHost.post<ShelfItem>(
    "api/shelf/addBookmarkToShelfItem",
    {
      email,
      progress,
      bookId,
    }
  );
  return data;
};

export const getBookmark = async (bookId: number, email: string) => {
  const { data } = await $authHost.get<number>("api/shelf/getBookmark", {
    params: { bookId, email },
  });
  return data;
};

export const removeBookFromShelf = async (bookId: number, email: string) => {
  const {
    data: { message },
  } = await $authHost.delete<{ message: string }>(
    "api/shelf/removeBookFromShelf",
    {
      params: { bookId, email },
    }
  );
  return message;
};
