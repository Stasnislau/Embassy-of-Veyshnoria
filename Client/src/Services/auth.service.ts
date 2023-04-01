import { API_URL } from "../../../Server/Constants";
import { AuthResponseInterface } from "../Interfaces";
import { AxiosResponse } from "axios";
import api from "../Http";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponseInterface>> {
    return api.post<AuthResponseInterface>(`${API_URL}/users/login`, {
      email,
      password,
    });
  }

  static async register(data: {
    email: string;
    password: string;
    name: string;
    surname: string;
  }): Promise<AxiosResponse<AuthResponseInterface>> {
    return api.post<AuthResponseInterface>(
      `${API_URL}/users/registration`,
      data
    );
  }
  static async logout(): Promise<void> {
    return api.post(`${API_URL}/users/logout`);
  }
}
