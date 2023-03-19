import "./index.scss";

import React, { useState } from "react";

import { Context } from "../../index";
import ErrorModal from "../../Components/ErrorModal";
import Header from "../../Components/Header";
import { ResidencePermitApplicationInterface } from "../../Interfaces";
import ResidenceService from "../../Services/residence.service";
import SurenessModal from "../../Components/SurenessModal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ResidencePermitPage = () => {
  const navigate = useNavigate();
  const { store } = React.useContext(Context);
  const [residencePermit, setResidencePermit] =
    useState<ResidencePermitApplicationInterface>(
      {} as ResidencePermitApplicationInterface
    );
  const [errorText, setErrorText] = useState<string | null>(null);
  const id = useParams().id as string;
  useEffect(() => {
    (async () => {
      try {
        store.isLoading = true;
        const response = await ResidenceService.fetchPermitApplicationById(id);
        console.log(response.data);
        setResidencePermit(response.data);
      } catch (error: any) {
        setErrorText(error.response.data.message);
      } finally {
        store.isLoading = false;
      }
    })();
  }, [id, store]);

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
            <div className="residence-permit-field zip-field">
              {" "}
              Zip: <span className="user-info">{residencePermit.zip}</span>
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

            <div className="residence-permit-field description-field">
              {" "}
              Description:{" "}
              <span className="user-info">{residencePermit.description}</span>
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
        handleConfirm={ async () => {
            
            try {
              const response = await ResidenceService.deletePermitApplication(id);
            if(response.status === 200){
              navigate("/dashboard");
            }
            } catch (error: any) {
              setErrorText(error.response.data.message);
            }
        }}
        text="delete this residence permit application"
      />
      {errorText && (
        <ErrorModal
          message={errorText}
          open={errorText ? true : false}
          handleOkay={() => setErrorText(null)}
        />
      )}
    </div>
  );
};

export default ResidencePermitPage;
