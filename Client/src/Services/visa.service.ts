import { AxiosResponse } from "axios";
import { VisaApplicationInterface } from "../Interfaces";
import api from "../Http";

class VisaService {
  static async createVisaApplication(
    data: VisaApplicationInterface
  ): Promise<AxiosResponse<VisaApplicationInterface>> {
    return api.post<VisaApplicationInterface>("/visas/create", data);
  }

  static async updateVisaApplication(
    data: VisaApplicationInterface,
    id: string
  ): Promise<AxiosResponse<VisaApplicationInterface>> {
    return api.put<VisaApplicationInterface>(`/visas/update/:${id}`, data);
  }

  static async deleteVisaApplication(
    id: string
  ): Promise<AxiosResponse<VisaApplicationInterface>> {
    return api.delete<VisaApplicationInterface>(`/visas/delete/:${id}`);
  }

  static async fetchVisaApplicationsByUser(): Promise<
    AxiosResponse<VisaApplicationInterface>
  > {
    return api.get<VisaApplicationInterface>(`/visas/users`);
  }
  static async fetchVisaApplicationById(
    id: string
  ): Promise<AxiosResponse<VisaApplicationInterface>> {
    return api.get<VisaApplicationInterface>(`/visas/specific/:${id}`);
  }
}

export default VisaService;
