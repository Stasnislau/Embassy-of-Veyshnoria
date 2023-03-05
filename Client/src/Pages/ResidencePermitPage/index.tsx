import "./index.scss";

import React, { useState } from "react";

import Header from "../../Components/Header";
import SurenessModal from "../../Components/SurenessModal";

interface ResidencePermitInterface {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  residencePermitType: string;
  passportNumber: string;
  passportIssuingCountry: string;
  passportExpirationDate: string;
  passportIssuingDate: string;
  comments: string;
  status: string;
}

const ResidencePermitPage = (id: number) => {
  // try catch for extracting and finding id
  const residencePermit: ResidencePermitInterface = {
    name: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    birthDate: "01/01/1990",
    birthPlace: "New York, USA",
    address: "123 Main Street",
    city: "New York",
    country: "USA",
    zipCode: "10001",
    residencePermitType: "Work Permit",
    passportNumber: "123456789",
    passportIssuingCountry: "USA",
    passportExpirationDate: "12/31/2025",
    passportIssuingDate: "12/31/2015",
    comments: "N/A",
    status: "Pending",
  };
  const found = true;
  const [open, setOpen] = useState(false);
  return (
    <div className="residence-permit-page">
      <Header />
      {found && (
        <div className="residence-permit-page-container">
          <h1 className="residence-permit-page-title">
            Residence Permit Application
          </h1>
          <hr className="residence-permit-page-line" />
          <div className="residence-permit-fields-container">
            <div className="residence-permit-field status-field">
              {" "}
              Status:{" "}
              <span className="user-info">{residencePermit.status}</span>
            </div>
            <div className="residence-permit-page-subtitle">
              Personal Information{" "}
            </div>
            <div className="residence-permit-field name-field">
              {" "}
              First Name:{" "}
              <span className="user-info">{residencePermit.name}</span>
            </div>
            <div className="residence-permit-field surname-field">
              {" "}
              Last Name:{" "}
              <span className="user-info">{residencePermit.surname}</span>
            </div>
            <div className="residence-permit-field email-field">
              {" "}
              Email: <span className="user-info">{residencePermit.email}</span>
            </div>
            <div className="residence-permit-field phone-number-field">
              {" "}
              Phone Number:{" "}
              <span className="user-info">{residencePermit.phoneNumber}</span>
            </div>
            <div className="residence-permit-field birth-date-field">
              {" "}
              Birth Date:{" "}
              <span className="user-info">{residencePermit.birthDate}</span>
            </div>
            <div className="residence-permit-field birth-place-field">
              {" "}
              Birth Place:{" "}
              <span className="user-info">{residencePermit.birthPlace}</span>
            </div>
            <div className="residence-permit-page-subtitle">
              Passport Information{" "}
            </div>
            <div className="residence-permit-field passport-number-field">
              {" "}
              Passport Number:{" "}
              <span className="user-info">
                {residencePermit.passportNumber}
              </span>
            </div>
            <div className="residence-permit-field passport-issuing-country-field">
              {" "}
              Passport Issuing Country:{" "}
              <span className="user-info">
                {residencePermit.passportIssuingCountry}
              </span>
            </div>
            <div className="residence-permit-field passport-expiration-date-field">
              {" "}
              Passport Expiration Date:{" "}
              <span className="user-info">
                {residencePermit.passportExpirationDate}
              </span>
            </div>
            <div className="residence-permit-field passport-issuing-date-field">
              {" "}
              Passport Issuing Date:{" "}
              <span className="user-info">
                {residencePermit.passportIssuingDate}
              </span>
            </div>
            <div className="residence-permit-page-subtitle">
              Address Information{" "}
            </div>
            <div className="residence-permit-field address-field">
              {" "}
              Address:{" "}
              <span className="user-info">{residencePermit.address}</span>
            </div>
            <div className="residence-permit-field city-field">
              {" "}
              City: <span className="user-info">{residencePermit.city}</span>
            </div>
            <div className="residence-permit-field country-field">
              {" "}
              Country:{" "}
              <span className="user-info">{residencePermit.country}</span>
            </div>
            <div className="residence-permit-field zip-code-field">
              {" "}
              Zip Code:{" "}
              <span className="user-info">{residencePermit.zipCode}</span>
            </div>
            <div className="residence-permit-page-subtitle">
              Residence Permit Information{" "}
            </div>
            <div className="residence-permit-field residence-permit-type-field">
              {" "}
              Residence Permit Type:{" "}
              <span className="user-info">
                {residencePermit.residencePermitType}
              </span>
            </div>

            <div className="residence-permit-field comments-field">
              {" "}
              Comments:{" "}
              <span className="user-info">{residencePermit.comments}</span>
            </div>
          </div>
          <div className="delete-button-container">
            <button className="delete-button" onClick={() => setOpen(true)}>
              Delete
            </button>
          </div>
        </div>
      )}
      {!found && (
        <h1 className="error-header">Residence Permit Application Not Found</h1>
      )}
      <SurenessModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        handleConfirm={() => {
          // delete application
          setOpen(false);
        }}
        text="delete this residence permit application"
      />
    </div>
  );
};

export default ResidencePermitPage;
