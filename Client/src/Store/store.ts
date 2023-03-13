import AuthService from "../Services/auth.service";
import { makeAutoObservable } from "mobx";
import { userDtoInterface } from "../Interfaces";

export default class Store {
  user = {} as userDtoInterface;
  isAuthorized = false;

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
}
