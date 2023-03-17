import { AxiosResponse } from "axios";
import { VisitInterface } from "../Interfaces";
import api from "../Http";

class VisitService {
  static async fetchVisitsByUser(): Promise<AxiosResponse<VisitInterface[]>> {
    return api.get<VisitInterface[]>("/visits/users");
  }
  static async getVisitById(id: string): Promise<AxiosResponse<VisitInterface>> {
    return api.get<VisitInterface>(`/visits/specific/${id}`);
  }
  static async createVisit(
    visit: VisitInterface
  ): Promise<AxiosResponse<VisitInterface>> {
    return api.post<VisitInterface>("/visits/create", visit);
  }
  static async updateVisit(
    visit: VisitInterface
  ): Promise<AxiosResponse<VisitInterface>> {
    return api.put<VisitInterface>(`/visits/update/${visit.id}`, visit);
  }
  static async deleteVisit(id: string): Promise<AxiosResponse<VisitInterface>> {
    return api.delete<VisitInterface>(`/visits/delete/${id}`);
  }
}

export default VisitService;
