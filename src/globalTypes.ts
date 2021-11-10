export type BookDescription = {
  id: number;
  title: string;
  author: string;
  description: string;
};

export type Book = BookDescription & { annotation: string; text: string };

export type UserRole = "USER" | "ADMIN" | null;

export type User = {
  email: string;
  password: string;
  role: UserRole;
};
