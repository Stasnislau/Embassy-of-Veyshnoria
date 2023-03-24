import {
  ResidencePermitApplicationFrontInterface,
  ResidencePermitApplicationInterface,
} from "../Interfaces";

import { AxiosResponse } from "axios";
import api from "../Http";

class ResidenceService {
  static async createPermitApplication(
    data: ResidencePermitApplicationFrontInterface
  ): Promise<AxiosResponse<ResidencePermitApplicationInterface>> {
    return api.post<ResidencePermitApplicationInterface>(
      "/api/permits/create",
      data
    );
  }
  static async updatePermitApplication(
    data: ResidencePermitApplicationInterface,
    id: string
  ): Promise<AxiosResponse<ResidencePermitApplicationInterface>> {
    return api.put<ResidencePermitApplicationInterface>(
      `/api/permits/update/${id}`,
      data
    );
  }
  static async deletePermitApplication(
    id: string
  ): Promise<AxiosResponse<ResidencePermitApplicationInterface>> {
    return api.delete<ResidencePermitApplicationInterface>(
      `/api/permits/delete/${id}`
    );
  }
  static async fetchPermitApplicationsByUser(): Promise<
    AxiosResponse<ResidencePermitApplicationInterface[]>
  > {
    return api.get<ResidencePermitApplicationInterface[]>(`/api/permits/users`);
  }
  static async fetchPermitApplicationById(
    id: string
  ): Promise<AxiosResponse<ResidencePermitApplicationInterface>> {
    return api.get<ResidencePermitApplicationInterface>(
      `/api/permits/specific/${id}`
    );
  }
}

export default ResidenceService;
