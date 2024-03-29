import { AuthResponseInterface, UserDtoInterface } from "../Interfaces";

import { API_URL } from "../Http";
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
      this.setIsLoading(true);
      const response = await AuthService.login(email, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      this.setIsAuthorized(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      return null;
    } finally {
      this.setIsLoading(false);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("accessToken");
      this.setIsAuthorized(false);
      this.setUser({} as UserDtoInterface);
    } catch (error: any) {
      return null;
    }
  }

  async checkAuthorization() {
    this.setIsLoading(true);
    try {
      const response = await axios.get<AuthResponseInterface>(
        `${API_URL}/users/refresh`,
        { withCredentials: true }
      );

      this.setIsAuthorized(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      return null;
    } finally {
      this.setIsLoading(false);
    }
  }
}
