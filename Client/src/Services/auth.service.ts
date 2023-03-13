import { AxiosResponse } from "axios";
import axios from "axios";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse> {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  }
}
