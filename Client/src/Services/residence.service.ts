import {
  ResidencePermitApplicationFrontInterface,
  ResidencePermitApplicationInterface,
} from "../Interfaces";

import { API_URL } from "../Http";
import { AxiosResponse } from "axios";
import api from "../Http";

class ResidenceService {
  static async createPermitApplication(
    data: ResidencePermitApplicationFrontInterface
  ): Promise<AxiosResponse<ResidencePermitApplicationInterface>> {
    return api.post<ResidencePermitApplicationInterface>(
      `${API_URL}/permits/create`,
      data
    );
  }
  static async updatePermitApplication(
    data: ResidencePermitApplicationInterface,
    id: string
  ): Promise<AxiosResponse<ResidencePermitApplicationInterface>> {
    return api.put<ResidencePermitApplicationInterface>(
      `${API_URL}/permits/update/${id}`,
      data
    );
  }
  static async deletePermitApplication(
    id: string
  ): Promise<AxiosResponse<ResidencePermitApplicationInterface>> {
    return api.delete<ResidencePermitApplicationInterface>(
      `${API_URL}/permits/delete/${id}`
    );
  }
  static async fetchPermitApplicationsByUser(): Promise<
    AxiosResponse<ResidencePermitApplicationInterface[]>
  > {
    return api.get<ResidencePermitApplicationInterface[]>(
      `${API_URL}/permits/users`
    );
  }
  static async fetchPermitApplicationById(
    id: string
  ): Promise<AxiosResponse<ResidencePermitApplicationInterface>> {
    return api.get<ResidencePermitApplicationInterface>(
      `${API_URL}/permits/specific/${id}`
    );
  }
}

export default ResidenceService;
