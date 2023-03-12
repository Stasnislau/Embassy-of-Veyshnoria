import { VisaApplicationInterface } from "../Interfaces";
import { embassyDB } from "../utils/db.server";

const ApiError = require("../exceptions/api-error");

export const getVisaApplicationById = async (
  id: number
): Promise<VisaApplicationInterface> => {
  const visaApplication = await embassyDB.visaApplications.findUnique({
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
      comments: true,
      status: true,
      passportExpirationDate: true,
      passportIssuingDate: true,
      passportIssuingCountry: true,
    },
  });
  if (!visaApplication) {
    throw ApiError.badRequest("VisaApplication not found");
  }
  return visaApplication;
};

export const getVisaApplicationsByUserId = async (
  userId: number
): Promise<VisaApplicationInterface[]> => {
  const visaApplications = await embassyDB.visaApplications.findMany({
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
      comments: true,
      status: true,
      passportExpirationDate: true,
      passportIssuingDate: true,
      passportIssuingCountry: true,
    },
  });
  if (!visaApplications) {
    throw ApiError.badRequest("VisaApplications not found");
  }
  return visaApplications;
};

export const createVisaApplication = async (
  userId: number,
  visaApplication: VisaApplicationInterface
): Promise<VisaApplicationInterface> => {
  const application = await embassyDB.visaApplications.create({
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
      comments: visaApplication.comments,
      status: visaApplication.status,
      passportExpirationDate: visaApplication.passportExpirationDate,
      passportIssuingDate: visaApplication.passportIssuingDate,
      passportIssuingCountry: visaApplication.passportIssuingCountry,
      user: {
        connect: {
          id: Number(userId),
        },
      },
    },
  });
  if (!application) {
    throw ApiError.badRequest("VisaApplication not created");
  }
  return application;
};

export const updateVisaApplication = async (
  id: number,
  visaApplication: VisaApplicationInterface
): Promise<VisaApplicationInterface> => {
  const updatedApplication = await embassyDB.visaApplications.update({
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
      comments: visaApplication.comments,
      status: visaApplication.status,
      passportExpirationDate: visaApplication.passportExpirationDate,
      passportIssuingDate: visaApplication.passportIssuingDate,
      passportIssuingCountry: visaApplication.passportIssuingCountry,
    },
  });
  if (!updatedApplication) {
    throw ApiError.badRequest("VisaApplication not updated");
  }
  return updatedApplication;
};
