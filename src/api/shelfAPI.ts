import { BookDescription, User } from "../globalTypes";
import { $host, $authHost } from "./index";
import jwt_decode from "jwt-decode";

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
