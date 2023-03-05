import "./index.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";

import Header from "../../Components/Header";
import TextError from "../../Components/TextError";
import { useNavigate } from "react-router-dom";

interface AccountInterface {
  id: number;
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportIssuingCountry: string;
}

const AccountInfoPage = (accountId: number) => {
  const [account, setAccount] = useState<AccountInterface>({
    id: 1,
    name: "John",
    surname: "Doe",
    email: "something@gmail.com",
    dateOfBirth: "2020-01-01",
    phoneNumber: "123456789",
    address: "Some address",
    city: "Some city",
    country: "Some country",
    zipCode: "12345",
    passportNumber: "123456789",
    passportExpirationDate: "2020-01-01",
    passportIssuingCountry: "Some country",
  });
  const found = true;
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  return (
    <div className="account-info-page">
      <Header />
      {found && !edit && (
        <div className="account-info-container">
          <div>
            <h1 className="account-info-page-title">Account Information</h1>
            <hr className="account-info-page-line" />
          </div>
          <div className="account-info">
            <div className="info-line name-line">
              <b>Name:</b> {account.name}
            </div>
            <div className="info-line surname-line">
              <b>Surname:</b> {account.surname}
            </div>
            <div className="info-line email-line">
              <b>Email:</b> {account.email}
            </div>
            <div className="info-line date-of-birth-line">
              <b>Date of birth:</b> {account.dateOfBirth}
            </div>
            <div className="info-line phone-number-line">
              <b>Phone number:</b> {account.phoneNumber}
            </div>
            <div className="info-line address-line">
              <b>Address:</b> {account.address}
            </div>
            <div className="info-line city-line">
              <b>City:</b> {account.city}
            </div>
            <div className="info-line country-line">
              <b>Country:</b> {account.country}
            </div>
            <div className="info-line zip-code-line">
              <b>Zip code:</b> {account.zipCode}
            </div>
            <div className="info-line passport-number-line">
              <b>Passport number:</b> {account.passportNumber}
            </div>
            <div className="info-line passport-expiration-date-line">
              <b>Passport expiration date:</b> {account.passportExpirationDate}
            </div>
            <div className="info-line passport-issuing-country-line">
              <b>Country of passport issue:</b> {account.passportIssuingCountry}
            </div>
          </div>
          <div className="buttons-container">
            <button
              className="edit-button"
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit
            </button>
            <button
              className="back-button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}
      {found && edit && (
        <div className="account-info-container">
          <div>
            <h1 className="account-info-page-title">Account Information</h1>
            <hr className="account-info-page-line" />
          </div>
          <Formik
            initialValues={{
              name: account.name,
              surname: account.surname,
              email: account.email,
              dateOfBirth: account.dateOfBirth,
              phoneNumber: account.phoneNumber,
              address: account.address,
              city: account.city,
              country: account.country,
              zipCode: account.zipCode,
              passportNumber: account.passportNumber,
              passportExpirationDate: account.passportExpirationDate,
              passportIssuingCountry: account.passportIssuingCountry,
            }}
            onSubmit={(values) => {
              console.log(values);
              setAccount({
                id: 1,
                name: values.name,
                surname: values.surname,
                email: values.email,
                dateOfBirth: values.dateOfBirth,
                phoneNumber: values.phoneNumber,
                address: values.address,
                city: values.city,
                country: values.country,
                zipCode: values.zipCode,
                passportNumber: values.passportNumber,
                passportExpirationDate: values.passportExpirationDate,
                passportIssuingCountry: values.passportIssuingCountry,
              });
              setEdit(false);
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              surname: Yup.string().required("Surname is required"),
              email: Yup.string().required("Email is required"),
              dateOfBirth: Yup.string().required("Date of birth is required"),
              phoneNumber: Yup.string().required("Phone number is required"),
              address: Yup.string().required("Address is required"),
              city: Yup.string().required("City is required"),
              country: Yup.string().required("Country is required"),
              zipCode: Yup.string().required("Zip code is required"),
              passportNumber: Yup.string().required(
                "Passport number is required"
              ),
              passportExpirationDate: Yup.string().required(
                "Passport expiration date is required"
              ),
              passportIssuingCountry: Yup.string().required(
                "Passport issuing country is required"
              ),
            })}
          >
            <Form className="account-info-form">
              <div className="account-info">
                <div className="info-line name-line">
                  <b>Name:</b>
                  <Field
                    className="input-field"
                    name="name"
                    type="text"
                    placeholder="Name"
                  />
                  <ErrorMessage
                    name="name"
                    component={TextError}
                    className="error-message"
                  />
                </div>
                <div className="info-line surname-line">
                  <b>Surname:</b>
                  <Field
                    className="input-field"
                    name="surname"
                    type="text"
                    placeholder="Surname"
                  />
                  <ErrorMessage
                    name="surname"
                    component={TextError}
                    className="error-message"
                  />
                </div>
                <div className="info-line email-line">
                  <b>Email:</b>
                  <Field
                    className="input-field"
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component={TextError}
                    className="error-message"
                  />
                </div>
                <div className="info-line date-of-birth-line">
                  <b>Date of birth:</b>
                  <Field
                    className="input-field"
                    name="dateOfBirth"
                    type="text"
                    placeholder="Date of birth"
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component={TextError}
                    className="error-message"
                  />
                </div>
                <div className="info-line phone-number-line">
                  <b>Phone number:</b>
                  <Field
                    className="input-field"
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone number"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component={TextError}
                    className="error-message"
                  />
                </div>
                <div className="info-line address-line">
                  <b>Address:</b>
                  <Field
                    className="input-field"
                    name="address"
                    type="text"
                    placeholder="Address"
                  />
                  <ErrorMessage
                    name="address"
                    component={TextError}
                    className="error-message"
                  />
                </div>
                <div className="info-line city-line">
                  <b>City:</b>
                  <Field
                    className="input-field"
                    name="city"
                    type="text"
                    placeholder="City"
                  />
                  <ErrorMessage
                    name="city"
                    component={TextError}
                    className="error-message"
                  />
                </div>
                <div className="info-line country-line">
                  <b>Country:</b>
                  <Field
                    className="input-field"
                    name="country"
                    type="text"
                    placeholder="Country"
                  />
                  <ErrorMessage
                    name="country"
                    component={TextError}
                    className="error-message"
                  />
                </div>
                <div className="info-line zip-code-line">
                  <b>Zip code:</b>
                  <Field
                    className="input-field"
                    name="zipCode"
                    type="text"
                    placeholder="Zip code"
                  />
                  <ErrorMessage
                    name="zipCode"
                    component={TextError}
                    className="error-message"
                  />
                </div>
                <div className="info-line passport-number-line">
                  <b>Passport number:</b>
                  <Field
                    className="input-field"
                    name="passportNumber"
                    type="text"
                    placeholder="Passport number"
                  />
                  <ErrorMessage
                    name="passportNumber"
                    component={TextError}
                    className="error-message"
                  />
                </div>
                <div className="info-line passport-expiration-date-line">
                  <b>Passport expiration date:</b>
                  <Field
                    className="input-field"
                    name="passportExpirationDate"
                    type="text"
                    placeholder="Passport expiration date"
                  />
                  <ErrorMessage
                    name="passportExpirationDate"
                    component={TextError}
                    className="error-message"
                  />
                </div>
                <div className="info-line passport-issuing-country-line">
                  <b>Country of passport issue :</b>
                  <Field
                    className="input-field"
                    name="passportIssuingCountry"
                    type="text"
                    placeholder="Passport issuing country"
                  />
                  <ErrorMessage
                    name="passportIssuingCountry"
                    component={TextError}
                    className="error-message"
                  />
                </div>
              </div>
              <div className="buttons-container">
                <button className="submit-button" type="submit">
                  Save
                </button>
                <button
                  className="back-button"
                  type="reset"
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      )}

      {!found && (
        <div className="error-header">
          <h1 className="error-message-title">Error 404</h1>
          <h2 className="error-message-subtitle">Account not found</h2>
        </div>
      )}
    </div>
  );
};

export default AccountInfoPage;
