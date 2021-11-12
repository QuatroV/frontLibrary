import { User, UserRole } from "../globalTypes";
import { $host, $authHost } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (
  email: string,
  password: string,
  role: UserRole
) => {
  const { data } = await $host.post<{ token: string }>(
    "api/user/registration",
    {
      email,
      password,
      role,
    }
  );
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email: string, password: string) => {
  const { data } = await $host.post<{ token: string }>("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const getIsUserAuth = async () => {
  const { data } = await $authHost.get<{ token: string }>("api/user/auth", {});
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
