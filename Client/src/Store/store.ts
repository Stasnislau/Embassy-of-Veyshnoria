import { authResponseInterface, userDtoInterface } from "../Interfaces";

import AuthService from "../Services/auth.service";
import axios from "axios";
import { makeAutoObservable } from "mobx";

export default class Store {
  user = {} as userDtoInterface;
  isAuthorized = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.user = {} as userDtoInterface;
    this.isAuthorized = false;
  }

  setIsAuthorized = (isAuthorized: boolean) => {
    this.isAuthorized = isAuthorized;
  };

  setUser = (user: userDtoInterface) => {
    this.user = user;
  };

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      this.setIsAuthorized(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("accessToken");
      this.setIsAuthorized(false);
      this.setUser({} as userDtoInterface);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }

  async checkAuthorization() {
    this.setIsLoading(true);
    try {
      const response = await axios.get<authResponseInterface>(
        "http://localhost:5000/users/refresh",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      this.setIsAuthorized(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
}
