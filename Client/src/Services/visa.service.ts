import {
  VisaApplicationFrontInterface,
  VisaApplicationInterface,
} from "../Interfaces";

import { API_URL } from "../Http";
import { AxiosResponse } from "axios";
import api from "../Http";

class VisaService {
  static async createVisaApplication(
    data: VisaApplicationFrontInterface
  ): Promise<AxiosResponse<VisaApplicationInterface>> {
    return api.post<VisaApplicationInterface>(`${API_URL}/visas/create`, data);
  }

  static async updateVisaApplication(
    data: VisaApplicationInterface,
    id: string
  ): Promise<AxiosResponse<VisaApplicationInterface>> {
    return api.put<VisaApplicationInterface>(
      `${API_URL}/visas/update/${id}`,
      data
    );
  }

  static async deleteVisaApplication(
    id: string
  ): Promise<AxiosResponse<VisaApplicationInterface>> {
    return api.delete<VisaApplicationInterface>(
      `${API_URL}/visas/delete/${id}`
    );
  }

  static async fetchVisaApplicationsByUser(): Promise<
    AxiosResponse<VisaApplicationInterface[]>
  > {
    return api.get<VisaApplicationInterface[]>(`${API_URL}/visas/users`);
  }
  static async fetchVisaApplicationById(
    id: string
  ): Promise<AxiosResponse<VisaApplicationInterface>> {
    return api.get<VisaApplicationInterface>(`${API_URL}/visas/specific/${id}`);
  }
}

export default VisaService;
