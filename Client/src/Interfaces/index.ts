export interface AuthResponseInterface {
  accessToken: string;
  refreshToken: string;
  user: UserDtoInterface;
}
export interface UserResponseInterface {
  user: UserInterface;
}
export interface UserDtoInterface {
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

export interface ResidencePermitApplicationInterface {
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

export interface ResidencePermitApplicationFrontInterface {
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
}

export interface VisitInterface {
  date: string;
  time: string;
  location: string;
  description: string;
  userId: number;
  id: number;
}

export interface UserInterface {
  name: string;
  surname: string;
  email: string;
  birthDate: string;
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
