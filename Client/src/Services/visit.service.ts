import { AxiosResponse } from "axios";
import api from "../Http";
import { visitInterface } from "../Interfaces";

export default class VisitService {
  static async getVisits(): Promise<AxiosResponse<visitInterface[]>> {
    return api.get<visitInterface[]>("/visits/users");
  }
  static async getVisit(id: string): Promise<AxiosResponse<visitInterface>> {
    return api.get<visitInterface>(`/visits/specific/${id}`);
  }
  static async createVisit(
    visit: visitInterface
  ): Promise<AxiosResponse<visitInterface>> {
    return api.post<visitInterface>("/visits/create", visit);
  }
  static async updateVisit(
    visit: visitInterface
  ): Promise<AxiosResponse<visitInterface>> {
    return api.put<visitInterface>(`/visits/update/${visit.id}`, visit);
  }
  static async deleteVisit(id: string): Promise<AxiosResponse<visitInterface>> {
    return api.delete<visitInterface>(`/visits/delete/${id}`);
  }
}
