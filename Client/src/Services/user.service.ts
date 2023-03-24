import { UserDtoInterface, UserInterface } from "../Interfaces";

import { AxiosResponse } from "axios";
import api from "../Http";

class userService {
  static async fetchUser(): Promise<AxiosResponse<UserInterface>> {
    return api.get<UserInterface>("/api/users/specific");
  }
  static async updateUser(
    data: UserInterface
  ): Promise<AxiosResponse<UserInterface>> {
    return api.put<UserInterface>("/api/users/update/user", data);
  }

  static async updatePassword(
    email: string,
    password: string
  ): Promise<AxiosResponse<UserInterface>> {
    return api.put<UserInterface>("/api/users/update/password", {
      email: email,
      password: password,
    });
  }
  static async fetchUserDTO(
    email: string
  ): Promise<AxiosResponse<UserDtoInterface>> {
    return api.get<UserDtoInterface>(`/api/users/dto/${email}`);
  }
}

export default userService;
