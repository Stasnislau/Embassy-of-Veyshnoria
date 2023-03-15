import { AxiosResponse } from "axios";
import api from "../Http"
import { userInterface } from "../Interfaces";

class userService {
    static async fetchUser(): Promise<AxiosResponse<userInterface>> {
        return api.get<userInterface>("/users");
    }  
}