import { VisitFrontInterface, VisitInterface } from "../Interfaces";

import { AxiosResponse } from "axios";
import api from "../Http";

class VisitService {
  static async fetchVisitsByUser(): Promise<AxiosResponse<VisitInterface[]>> {
    return api.get<VisitInterface[]>("/api/visits/users");
  }
  static async fetchVisitById(
    id: string
  ): Promise<AxiosResponse<VisitInterface>> {
    return api.get<VisitInterface>(`/api/visits/specific/${id}`);
  }
  static async createVisit(
    visit: VisitFrontInterface
  ): Promise<AxiosResponse<VisitFrontInterface>> {
    return api.post<VisitFrontInterface>("/api/visits/create", visit);
  }
  static async updateVisit(
    visit: VisitInterface
  ): Promise<AxiosResponse<VisitInterface>> {
    return api.put<VisitInterface>(`/api/visits/update/${visit.id}`, visit);
  }
  static async deleteVisit(id: string): Promise<AxiosResponse<VisitInterface>> {
    return api.delete<VisitInterface>(`/api/visits/delete/${id}`);
  }
}

export default VisitService;
