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
      "/permits/create",
      data
    );
  }
  static async updatePermitApplication(
    data: ResidencePermitApplicationInterface,
    id: string
  ): Promise<AxiosResponse<ResidencePermitApplicationInterface>> {
    return api.put<ResidencePermitApplicationInterface>(
      `/permits/update/:${id}`,
      data
    );
  }
  static async deletePermitApplication(
    id: string
  ): Promise<AxiosResponse<ResidencePermitApplicationInterface>> {
    return api.delete<ResidencePermitApplicationInterface>(
      `/permits/delete/:${id}`
    );
  }
  static async fetchPermitApplicationsByUser(): Promise<
    AxiosResponse<ResidencePermitApplicationInterface>
  > {
    return api.get<ResidencePermitApplicationInterface>(`/permits/users`);
  }
  static async fetchPermitApplicationById(
    id: string
  ): Promise<AxiosResponse<ResidencePermitApplicationInterface>> {
    return api.get<ResidencePermitApplicationInterface>(
      `/permits/specific/:${id}`
    );
  }
}

export default ResidenceService;
