import { AuthResponseInterface } from "../Interfaces";
import { AxiosResponse } from "axios";
import api from "../Http";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponseInterface>> {
    return api.post<AuthResponseInterface>("/users/login", { email, password });
  }

  static async register(data: {
    email: string;
    password: string;
    name: string;
    surname: string;
  }): Promise<AxiosResponse<AuthResponseInterface>> {
    return api.post<AuthResponseInterface>("/users/registration", data);
  }
  static async logout(): Promise<void> {
    return api.post("/users/logout");
  }
}
