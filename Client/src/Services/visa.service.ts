import { VisaApplicationFrontInterface, VisaApplicationInterface } from "../Interfaces";

import { AxiosResponse } from "axios";
import api from "../Http";

class VisaService {
  static async createVisaApplication(
    data: VisaApplicationFrontInterface
  ): Promise<AxiosResponse<VisaApplicationInterface>> {
    return api.post<VisaApplicationInterface>("/api/visas/create", data);
  }

  static async updateVisaApplication(
    data: VisaApplicationInterface,
    id: string
  ): Promise<AxiosResponse<VisaApplicationInterface>> {
    return api.put<VisaApplicationInterface>(`/api/visas/update/${id}`, data);
  }

  static async deleteVisaApplication(
    id: string
  ): Promise<AxiosResponse<VisaApplicationInterface>> {
    return api.delete<VisaApplicationInterface>(`/api/visas/delete/${id}`);
  }

  static async fetchVisaApplicationsByUser(): Promise<
    AxiosResponse<VisaApplicationInterface[]>
  > {
    return api.get<VisaApplicationInterface[]>(`/api/visas/users`);
  }
  static async fetchVisaApplicationById(
    id: string
  ): Promise<AxiosResponse<VisaApplicationInterface>> {
    return api.get<VisaApplicationInterface>(`/api/visas/specific/${id}`);
  }
}

export default VisaService;
