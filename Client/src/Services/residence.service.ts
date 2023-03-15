import { AxiosResponse } from "axios";
import { ResidencePermitApplicationsInterface } from "../Interfaces";
import api from "../Http";

class ResidenceService {
  static async createPermitApplication(
    data: ResidencePermitApplicationsInterface
  ): Promise<AxiosResponse<ResidencePermitApplicationsInterface>> {
    return api.post<ResidencePermitApplicationsInterface>(
      "/permits/create",
      data
    );
  }
  static async updatePermitApplication(
    data: ResidencePermitApplicationsInterface,
    id: string
  ): Promise<AxiosResponse<ResidencePermitApplicationsInterface>> {
    return api.put<ResidencePermitApplicationsInterface>(
      `/permits/update/:${id}`,
      data
    );
  }
  static async deletePermitApplication(
    id: string
  ): Promise<AxiosResponse<ResidencePermitApplicationsInterface>> {
    return api.delete<ResidencePermitApplicationsInterface>(
      `/permits/delete/:${id}`
    );
  }
  static async fetchPermitApplicationsByUser(): Promise<
    AxiosResponse<ResidencePermitApplicationsInterface>
  > {
    return api.get<ResidencePermitApplicationsInterface>(`/permits/users`);
  }
  static async fetchPermitApplicationById(
    id: string
  ): Promise<AxiosResponse<ResidencePermitApplicationsInterface>> {
    return api.get<ResidencePermitApplicationsInterface>(
      `/permits/specific/:${id}`
    );
  }
}

export default ResidenceService;
