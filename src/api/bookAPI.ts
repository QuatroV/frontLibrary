import { Book, BookDescription } from "../globalTypes";
import { $host, $authHost } from "./index";

export const getAllBooksNamesAuthorsAndDescriptions = async () => {
  const { data } = await $host.get<{ books: BookDescription[] }>(
    "api/book/getBooksTitlesAndDescriptions"
  );
  return data.books;
};

export const getBookText = async (email: string, bookId: number) => {
  const { data } = await $authHost.get<{ text: { text: string }[] }>(
    "api/book/getBookText",
    { params: { email, bookId } }
  );
  const text = data.text[0].text;
  return text;
};

export const addNewBook = async (
  title: string,
  authorName: string,
  description: string,
  annotation: string,
  textFile: any
) => {
  let formData = new FormData();
  formData.append("title", title);
  formData.append("authorName", authorName);
  formData.append("description", description);
  formData.append("annotation", annotation);
  formData.append("textFile", textFile);
  const { data } = await $authHost.post<{ newBook: Book }>(
    "api/book/addNewBook",
    formData
  );
  return data;
};

export const deleteBook = async (bookId: number) => {
  const { data } = await $authHost.delete<{ message: string }>(
    "api/book/deleteBook",
    {
      data: { bookId },
    }
  );
  return data;
};

export const getBook = async (bookId: number) => {
  const { data } = await $authHost.get<{ bookInfo: Omit<Book, "text">[] }>(
    "api/book/getBook",
    {
      params: { bookId },
    }
  );
  return data;
};

export const updateBookInfo = async (
  bookId: number,
  title: string,
  author: string,
  description: string,
  annotation: string
) => {
  const { data } = await $authHost.patch<{ success: boolean }>(
    "api/book/updateBookInfo",
    {
      bookId,
      title,
      author,
      description,
      annotation,
    }
  );
  return data;
};
