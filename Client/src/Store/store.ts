import { AuthResponseInterface, UserDtoInterface } from "../Interfaces";

import AuthService from "../Services/auth.service";
import axios from "axios";
import { makeAutoObservable } from "mobx";

export default class Store {
  tokens = {} as AuthResponseInterface;
  user = {} as UserDtoInterface;
  isAuthorized = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.user = {} as UserDtoInterface;
    this.isAuthorized = false;
  }

  setIsAuthorized = (isAuthorized: boolean) => {
    this.isAuthorized = isAuthorized;
  };

  setUser = (user: UserDtoInterface) => {
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
      this.setUser({} as UserDtoInterface);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }

  async checkAuthorization() {
    this.setIsLoading(true);
    try {
      const response = await axios.get<AuthResponseInterface>(
        "http://localhost:3001/users/refresh",
        { withCredentials: true }
      );
      console.log(response);
      this.setIsAuthorized(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
}
