import { AxiosResponse } from "axios";
import api from "../Http";
import { authResponseInterface } from "../Interfaces";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<authResponseInterface>> {
    return api.post<authResponseInterface>("/users/login", { email, password });
  }

  static async register(
    email: string,
    password: string
  ): Promise<AxiosResponse<authResponseInterface>> {
    return api.post<authResponseInterface>("/users/register", {
      email,
      password,
    });
  }
  static async logout(): Promise<void> {
    return api.post("/users/logout");
  }
}
