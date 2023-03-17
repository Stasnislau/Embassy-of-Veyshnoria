import ApiError from "../exceptions/api-error";
import { VisaApplicationInterface } from "../Interfaces";
import { embassyDB } from "../utils/db.server";

class visaService {
  getVisaApplicationById = async (
    id: number
  ): Promise<VisaApplicationInterface> => {
    const visaApplication = await embassyDB.visa_applications.findUnique({
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
        visaType: true,
        visaDuration: true,
        visaDate: true,
        description: true,
        status: true,
        passportExpirationDate: true,
        passportIssuingDate: true,
        passportIssuingCountry: true,
        dateOfSubmission: true,
        dateOfDecision: true,
      },
    });
    if (!visaApplication) {
      throw ApiError.badRequest("Visa Application not found");
    }
    return visaApplication;
  };

  getVisaApplicationsByUserId = async (
    userId: string
  ): Promise<VisaApplicationInterface[]> => {
    const visaApplications = await embassyDB.visa_applications.findMany({
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
        visaType: true,
        visaDuration: true,
        visaDate: true,
        description: true,
        status: true,
        passportExpirationDate: true,
        passportIssuingDate: true,
        passportIssuingCountry: true,
        dateOfSubmission: true,
        dateOfDecision: true,
      },
    });
    if (!visaApplications) {
      throw ApiError.badRequest("Visa Applications not found");
    }
    return visaApplications;
  };

  createVisaApplication = async (
    userId: string,
    visaApplication: VisaApplicationInterface
  ): Promise<VisaApplicationInterface> => {
    const application = await embassyDB.visa_applications.create({
      data: {
        name: visaApplication.name,
        surname: visaApplication.surname,
        email: visaApplication.email,
        birthDate: visaApplication.birthDate,
        birthPlace: visaApplication.birthPlace,
        phoneNumber: visaApplication.phoneNumber,
        address: visaApplication.address,
        city: visaApplication.city,
        country: visaApplication.country,
        zip: visaApplication.zip,
        passportNumber: visaApplication.passportNumber,
        visaType: visaApplication.visaType,
        visaDuration: visaApplication.visaDuration,
        visaDate: visaApplication.visaDate,
        description: visaApplication.description,
        status: visaApplication.status,
        passportExpirationDate: visaApplication.passportExpirationDate,
        passportIssuingDate: visaApplication.passportIssuingDate,
        passportIssuingCountry: visaApplication.passportIssuingCountry,
        dateOfSubmission: new Date().toLocaleDateString(),
        dateOfDecision: "To be decided",
        user: {
          connect: {
            id: Number(userId),
          },
        },
      },
    });
    if (!application) {
      throw ApiError.badRequest("Visa Application not created");
    }
    return application;
  };

  updateVisaApplication = async (
    id: number,
    visaApplication: VisaApplicationInterface
  ): Promise<VisaApplicationInterface> => {
    const updatedApplication = await embassyDB.visa_applications.update({
      where: {
        id: Number(id),
      },
      data: {
        name: visaApplication.name,
        surname: visaApplication.surname,
        email: visaApplication.email,
        birthDate: visaApplication.birthDate,
        birthPlace: visaApplication.birthPlace,
        phoneNumber: visaApplication.phoneNumber,
        address: visaApplication.address,
        city: visaApplication.city,
        country: visaApplication.country,
        zip: visaApplication.zip,
        passportNumber: visaApplication.passportNumber,
        visaType: visaApplication.visaType,
        visaDuration: visaApplication.visaDuration,
        visaDate: visaApplication.visaDate,
        description: visaApplication.description,
        status: visaApplication.status,
        passportExpirationDate: visaApplication.passportExpirationDate,
        passportIssuingDate: visaApplication.passportIssuingDate,
        passportIssuingCountry: visaApplication.passportIssuingCountry,
        dateOfSubmission: visaApplication.dateOfSubmission,
        dateOfDecision: visaApplication.dateOfDecision,
      },
    });
    if (!updatedApplication) {
      throw ApiError.badRequest("Visa Application not updated");
    }
    return updatedApplication;
  };

  deleteVisaApplication = async (
    id: string,
    userId: string
  ): Promise<VisaApplicationInterface> => {
    const visaApplication = await embassyDB.visa_applications.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        userId: true,
      },
    });
    if (!visaApplication || visaApplication.userId !== Number(userId)) {
      throw ApiError.badRequest("Visa Application not found");
    }

    const deletedApplication = await embassyDB.visa_applications.delete({
      where: {
        id: Number(id),
      },
    });
    if (!deletedApplication) {
      throw ApiError.badRequest("Visa Application not deleted");
    }
    return deletedApplication;
  };
}

export default new visaService();
