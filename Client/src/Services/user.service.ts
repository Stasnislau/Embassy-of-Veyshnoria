import { UserDtoInterface, UserInterface } from "../Interfaces";

import { API_URL } from "../Http";
import { AxiosResponse } from "axios";
import api from "../Http";

class userService {
  static async fetchUser(): Promise<AxiosResponse<UserInterface>> {
    return api.get<UserInterface>(`${API_URL}/users/specific`);
  }
  static async updateUser(
    data: UserInterface
  ): Promise<AxiosResponse<UserInterface>> {
    return api.put<UserInterface>(`${API_URL}/users/update/user`, data);
  }

  static async updatePassword(
    email: string,
    password: string
  ): Promise<AxiosResponse<UserInterface>> {
    return api.put<UserInterface>(`${API_URL}/users/update/password`, {
      email: email,
      password: password,
    });
  }
  static async fetchUserDTO(
    email: string
  ): Promise<AxiosResponse<UserDtoInterface>> {
    return api.get<UserDtoInterface>(`${API_URL}/users/dto/${email}`);
  }
}

export default userService;
