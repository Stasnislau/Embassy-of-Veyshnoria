export interface authResponseInterface {
  accessToken: string;
  refreshToken: string;
  user: userDtoInterface;
}
export interface userResponseInterface{
  user: UserInterface;
}
export interface userDtoInterface {
  id: string;
  email: string;
  name: string;
  surname: string;
}

export interface VisaApplicationInterface {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  visaType: string;
  visaDuration: string;
  visaDate: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportIssuingDate: string;
  passportIssuingCountry: string;
  description: string;
  status: string;
  dateOfSubmission: string;
  dateOfDecision: string;
}

export interface ResidencePermitApplicationsInterface {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  residencePermitType: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportIssuingDate: string;
  passportIssuingCountry: string;
  description: string;
  status: string;
  dateOfSubmission: string;
  dateOfDecision: string;
}

export interface UserInterface {
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  birthPlace: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportIssuingDate: string;
  passportIssuingCountry: string;
}

export interface visitInterface {
  date: string;
  time: string;
  location: string;
  description: string;
  userId: number;
  id: number;
}

export interface visaApplicationInterface {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  visaType: string;
  visaDuration: string;
  visaDate: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportIssuingDate: string;
  passportIssuingCountry: string;
  comments: string;
  status: string;
}

export interface userInterface {
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  birthPlace: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportIssuingDate: string;
  passportIssuingCountry: string;
}
