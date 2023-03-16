import { userDtoInterface, userInterface } from "../Interfaces";

import { AxiosResponse } from "axios";
import api from "../Http";

class userService {
  static async fetchUser(): Promise<AxiosResponse<userInterface>> {
    return api.get<userInterface>("/users/specific");
  }
  static async updateUser(
    data: userInterface
  ): Promise<AxiosResponse<userInterface>> {
    return api.put<userInterface>("/users/update/user", data);
  }

  static async updatePassword(
    email: string,
    password: string
  ): Promise<AxiosResponse<userInterface>> {
    return api.put<userInterface>("/users/update/password", {
      email: email,
      password: password,
    });
  }
  static async fetchUserDTO(
    email: string
  ): Promise<AxiosResponse<userDtoInterface>> {
    return api.get<userDtoInterface>(`/users/dto/${email}`);
  }
}

export default userService;
