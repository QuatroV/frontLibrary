import { BookDescription, User } from "../globalTypes";
import { $host, $authHost } from "./index";
import jwt_decode from "jwt-decode";

export const getAllBooksNamesAuthorsAndDescriptions = async () => {
  const { data } = await $host.get<{ books: BookDescription[] }>(
    "api/book/getBooksTitlesAndDescriptions"
  );
  return data.books;
};
