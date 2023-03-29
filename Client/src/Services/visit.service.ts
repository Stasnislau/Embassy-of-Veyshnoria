import { VisitFrontInterface, VisitInterface } from "../Interfaces";

import { AxiosResponse } from "axios";
import api from "../Http";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

class VisitService {
  static async fetchVisitsByUser(): Promise<AxiosResponse<VisitInterface[]>> {
    return api.get<VisitInterface[]>("/visits/users", { headers });
  }

  static async fetchVisitById(
    id: string
  ): Promise<AxiosResponse<VisitInterface>> {
    return api.get<VisitInterface>(`/visits/specific/${id}`, { headers });
  }

  static async createVisit(
    visit: VisitFrontInterface
  ): Promise<AxiosResponse<VisitFrontInterface>> {
    return api.post<VisitFrontInterface>("/visits/create", visit, { headers });
  }

  static async updateVisit(
    visit: VisitInterface
  ): Promise<AxiosResponse<VisitInterface>> {
    return api.put<VisitInterface>(`/visits/update/${visit.id}`, visit, {
      headers,
    });
  }

  static async deleteVisit(id: string): Promise<AxiosResponse<VisitInterface>> {
    return api.delete<VisitInterface>(`/visits/delete/${id}`, { headers });
  }
}

export default VisitService;
