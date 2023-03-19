import ApiError from "../exceptions/api-error";
import {
  ResidencePermitApplicationInterface,
} from "../Interfaces";
import { embassyDB } from "../utils/db.server";
import moment from "moment";

class ResidencePermitApplicationService {
  getResidencePermitApplicationById = async (
    id: string
  ): Promise<ResidencePermitApplicationInterface> => {
    const residencePermitApplication =
      await embassyDB.residence_permit_applications.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
          birthDate: true,
          birthPlace: true,
          phoneNumber: true,
          address: true,
          city: true,
          country: true,
          zip: true,
          passportNumber: true,
          residencePermitType: true,
          description: true,
          status: true,
          passportExpirationDate: true,
          passportIssuingDate: true,
          passportIssuingCountry: true,
          dateOfSubmission: true,
          dateOfDecision: true,
        },
      });
    if (!residencePermitApplication) {
      throw ApiError.badRequest("Residence Permit Application not found");
    }
    
    return residencePermitApplication;
  };

  getResidencePermitApplicationsByUserId = async (
    userId: string
  ): Promise<ResidencePermitApplicationInterface[]> => {
    const residencePermitApplications =
      await embassyDB.residence_permit_applications.findMany({
        where: {
          userId: Number(userId),
        },
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
          birthDate: true,
          birthPlace: true,
          phoneNumber: true,
          address: true,
          city: true,
          country: true,
          zip: true,
          passportNumber: true,
          residencePermitType: true,
          description: true,
          status: true,
          passportExpirationDate: true,
          passportIssuingDate: true,
          passportIssuingCountry: true,
          dateOfSubmission: true,
          dateOfDecision: true,
        },
      });
    if (!residencePermitApplications) {
      throw ApiError.badRequest("Residence Permit Applications not found");
    }
    return residencePermitApplications;
  };

  createResidencePermitApplication = async (
    residencePermitApplication: ResidencePermitApplicationInterface,
    userId: string
  ): Promise<ResidencePermitApplicationInterface> => {
    const residenceApplication =
      await embassyDB.residence_permit_applications.create({
        data: {
          name: residencePermitApplication.name,
          surname: residencePermitApplication.surname,
          email: residencePermitApplication.email,
          phoneNumber: residencePermitApplication.phoneNumber,
          birthDate: residencePermitApplication.birthDate,
          birthPlace: residencePermitApplication.birthPlace,
          address: residencePermitApplication.address,
          city: residencePermitApplication.city,
          zip: residencePermitApplication.zip,
          country: residencePermitApplication.country,
          residencePermitType: residencePermitApplication.residencePermitType,
          passportNumber: residencePermitApplication.passportNumber,
          passportExpirationDate:
            residencePermitApplication.passportExpirationDate,
          passportIssuingDate: residencePermitApplication.passportIssuingDate,
          passportIssuingCountry:
            residencePermitApplication.passportIssuingCountry,
          description: residencePermitApplication.description,
          status: "Pending",
          dateOfSubmission: moment().format("DD.MM.YYYY"),
          dateOfDecision: "To be decided",
          user: {
            connect: {
              id: Number(userId),
            },
          },
        },
      });

    if (!residenceApplication) {
      throw ApiError.badRequest("Residence Permit Application not found");
    }

    return residenceApplication;
  };

  updateResidencePermitApplication = async (
    id: number,
    residencePermitApplication: ResidencePermitApplicationInterface
  ): Promise<ResidencePermitApplicationInterface> => {
    const updatedResidencePermitApplication =
      await embassyDB.residence_permit_applications.update({
        where: {
          id: Number(id),
        },
        data: {
          name: residencePermitApplication.name,
          surname: residencePermitApplication.surname,
          email: residencePermitApplication.email,
          phoneNumber: residencePermitApplication.phoneNumber,
          birthDate: residencePermitApplication.birthDate,
          birthPlace: residencePermitApplication.birthPlace,
          address: residencePermitApplication.address,
          city: residencePermitApplication.city,
          zip: residencePermitApplication.zip,
          country: residencePermitApplication.country,
          residencePermitType: residencePermitApplication.residencePermitType,
          passportNumber: residencePermitApplication.passportNumber,
          passportExpirationDate:
            residencePermitApplication.passportExpirationDate,
          passportIssuingDate: residencePermitApplication.passportIssuingDate,
          passportIssuingCountry:
            residencePermitApplication.passportIssuingCountry,
          description: residencePermitApplication.description,
          status: residencePermitApplication.status,
          dateOfSubmission: residencePermitApplication.dateOfSubmission,
          dateOfDecision: residencePermitApplication.dateOfDecision,
        },
      });

    if (!updatedResidencePermitApplication) {
      throw ApiError.badRequest("Residence Permit Application not found");
    }
    return updatedResidencePermitApplication;
  };

  deleteResidencePermitApplication = async (
    id: string,
    userId: string
  ): Promise<ResidencePermitApplicationInterface> => {
    const residencePermitApplication =
      await embassyDB.residence_permit_applications.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          userId: true,
        },
      });
    if (
      !residencePermitApplication ||
      residencePermitApplication.userId !== Number(userId)
    ) {
      throw ApiError.badRequest("Residence Permit Application not found");
    }

    const deletedResidencePermitApplication =
      await embassyDB.residence_permit_applications.delete({
        where: {
          id: Number(id),
        },
      });

    if (!deletedResidencePermitApplication) {
      throw ApiError.badRequest("Residence Permit Application not found");
    }
    return deletedResidencePermitApplication;
  };
}

export default new ResidencePermitApplicationService();
