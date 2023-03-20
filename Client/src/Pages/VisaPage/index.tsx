import "./index.scss";

import React, { useState } from "react";
import { UserInterface, VisaApplicationInterface } from "../../Interfaces";

import { Context } from "../../index";
import ErrorModal from "../../Components/ErrorModal";
import Header from "../../Components/Header";
import SurenessModal from "../../Components/SurenessModal";
import VisaService from "../../Services/visa.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const VisaPage = () => {
  const [visa, setVisa] = useState<VisaApplicationInterface>(
    {} as VisaApplicationInterface
  );
  const [errorText, setErrorText] = useState<string | null>(null);
  const { store } = React.useContext(Context);
  const id = useParams().id as string;

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        store.setIsLoading(true);
        const response = await VisaService.fetchVisaApplicationById(id);
        setVisa(response.data);
      } catch (error: any) {
        setErrorText(error.response.data.message);
      } finally {
        store.setIsLoading(false);
      }
    })();
  }, [id, store.isLoading]);

  const [open, setOpen] = useState(false);

  return (
    <div className="visa-page">
      <Header />
      <div className="visa-container">
        <h1 className="visa-page-title">Visa Application</h1>
        <hr className="visa-page-line" />
        <div className="visa-fields-container">
          <div className="visa-field status-field">
            Status: <span className="user-info">{visa.status}</span>
          </div>
          <div className="visa-page-subtitle">Personal Information</div>
          <div className="visa-field name-field">
            Name: <span className="user-info">{visa.name}</span>
          </div>
          <div className="visa-field surname-field">
            Surname: <span className="user-info">{visa.surname}</span>
          </div>
          <div className="visa-field email-field">
            Email: <span className="user-info">{visa.email}</span>
          </div>
          <div className="visa-field phone-field">
            Phone Number: <span className="user-info">{visa.phoneNumber}</span>
          </div>
          <div className="visa-field address-field">
            Address: <span className="user-info">{visa.address}</span>
          </div>
          <div className="visa-field country-field">
            Country: <span className="user-info">{visa.country}</span>
          </div>
          <div className="visa-field city-field">
            City: <span className="user-info">{visa.city}</span>
          </div>
          <div className="visa-field zip-field">
            Zip: <span className="user-info">{visa.zip}</span>
          </div>
          <div className="visa-page-subtitle">Passport Information</div>
          <div className="visa-field passport-number-field">
            Passport Number:{" "}
            <span className="user-info">{visa.passportNumber}</span>
          </div>
          <div className="visa-field passport-expiration-field">
            Passport Expiration Date:{" "}
            <span className="user-info">{visa.passportExpirationDate}</span>
          </div>
          <div className="visa-field passport-country-field">
            Passport Issuing Country:{" "}
            <span className="user-info">{visa.passportIssuingCountry}</span>
          </div>
          <div className="visa-page-subtitle">Visa Information</div>
          <div className="visa-field visa-type-field">
            Visa Type: <span className="user-info">{visa.visaType}</span>
          </div>
          <div className="visa-field visa-duration-field">
            Visa Duration:{" "}
            <span className="user-info">{visa.visaDuration}</span>
          </div>
          <div className="visa-field visa-date-field">
            Visa Date: <span className="user-info">{visa.visaDate}</span>
          </div>
          <div className="visa-field description-field">
            Description: <span className="user-info">{visa.description}</span>
          </div>
          <div className="visa-field date-of-submission-field">
            Date of Submission:{" "}
            <span className="user-info">{visa.dateOfSubmission}</span>
          </div>
          <div className="visa-field date-of-decision-field">
            Date of Decision:{" "}
            <span className="user-info">{visa.dateOfDecision}</span>
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
      {errorText && (
        <ErrorModal
          message={errorText}
          open={Boolean(errorText)}
          handleOkay={() => {
            setErrorText(null);
          }}
        />
      )}
    </div>
  );
};

export default VisaPage;
