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

  static async register(data: {
    email: string;
    password: string;
    name: string;
    surname: string;
  }): Promise<AxiosResponse<authResponseInterface>> {
    return api.post<authResponseInterface>("/users/registration", data);
  }
  static async logout(): Promise<void> {
    return api.post("/users/logout");
  }
}
