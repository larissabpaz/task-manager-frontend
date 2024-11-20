import { User } from "../main/MainContextProvider";
import { api, TOKEN_KEY } from "./api-instance";

const ROUTE = "/login";

export type PostLogin = {
  email: string;
  password: string;
};

export async function login(user: PostLogin): Promise<User> {
  const result = await api.post(ROUTE, user);
  const token = result.data.token;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("user", JSON.stringify(user));
  return result.data;
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("user");
}