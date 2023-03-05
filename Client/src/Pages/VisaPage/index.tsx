import "./index.scss";

import React, { useState } from "react";

import Header from "../../Components/Header";
import SurenessModal from "../../Components/SurenessModal";

interface VisaInterface {
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  passportNumber: string;
  passportExpiration: string;
  passportCountry: string;
  visaType: string;
  visaDuration: string;
  visaDate: string;
  comments: string;
  status: string;
}

const VisaPage = (id: number) => {
  // try catch for extracting and finding id
  const visa: VisaInterface = {
    name: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    phone: "+1 123 456 7890",
    address: "123 Main St",
    city: "Anytown",
    state: "ST",
    zip: "12345",
    country: "USA",
    passportNumber: "1234567890",
    passportExpiration: "2024-12-31",
    passportCountry: "USA",
    visaType: "Tourist",
    visaDuration: "90 days",
    visaDate: "2023-03-01",
    comments: "",
    status: "Pending",
  };

  const [open, setOpen] = useState(false);
  const found = true;

  return (
    <div className="visa-page">
      <Header />
      {found && (
        <div className="visa-container">
          <h1 className="visa-page-title">Visa Application</h1>
          <hr className="visa-page-line" />
          <div className="visa-fields-container">
            <div className="visa-field status-field">
              {" "}
              Status: <span className="user-info">{visa.status}</span>
            </div>
            <div className="visa-page-subtitle">Personal Information </div>
            <div className="visa-field name-field">
              First Name: <span className="user-info">{visa.name}</span>
            </div>
            <div className="visa-field surname-field">
              {" "}
              Last Name: <span className="user-info">{visa.surname}</span>
            </div>
            <div className="visa-field email-field">
              {" "}
              Email: <span className="user-info">{visa.email}</span>
            </div>
            <div className="visa-field phone-field">
              {" "}
              Phone: <span className="user-info">{visa.phone}</span>
            </div>
            <div className="visa-field address-field">
              {" "}
              Address: <span className="user-info">{visa.address}</span>
            </div>
            <div className="visa-field city-field">
              {" "}
              City: <span className="user-info">{visa.city}</span>
            </div>
            <div className="visa-field state-field">
              {" "}
              State: <span className="user-info">{visa.state}</span>
            </div>
            <div className="visa-field zip-field">
              {" "}
              Zip: <span className="user-info">{visa.zip}</span>
            </div>
            <div className="visa-field country-field">
              {" "}
              Country: <span className="user-info">{visa.country}</span>
            </div>
            <div className="visa-page-subtitle">Passport Information </div>
            <div className="visa-field passport-number-field">
              {" "}
              Passport Number:{" "}
              <span className="user-info">{visa.passportNumber}</span>
            </div>
            <div className="visa-field passport-expiration-field">
              {" "}
              Passport Expiration:{" "}
              <span className="user-info">{visa.passportExpiration}</span>
            </div>
            <div className="visa-field passport-country-field">
              {" "}
              Passport Country:{" "}
              <span className="user-info">{visa.passportCountry}</span>
            </div>
            <div className="visa-page-subtitle">Visa Information </div>
            <div className="visa-field visa-type-field">
              {" "}
              Visa Type: <span className="user-info">{visa.visaType}</span>
            </div>
            <div className="visa-field visa-duration-field">
              {" "}
              Visa Duration:{" "}
              <span className="user-info">{visa.visaDuration}</span>
            </div>
            <div className="visa-field visa-date-field">
              {" "}
              Visa Date: <span className="user-info">{visa.visaDate}</span>
            </div>
            <div className="visa-field comments-field">
              {" "}
              Comments: <span className="user-info">{visa.comments}</span>
            </div>
          </div>
          <div className="delete-button-container">
            <button
              className="visa-button delete-button"
              onClick={() => {
                setOpen(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {!found && !open && <h1 className="error-header">Visa not found</h1>}

      <SurenessModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        handleConfirm={() => {
          // delete visa
          setOpen(false);
        }}
        text="delete this visa"
      />
    </div>
  );
};

export default VisaPage;
