import "./index.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";

import { Context } from "../../index";
import ErrorModal from "../../Components/ErrorModal";
import Header from "../../Components/Header";
import TextError from "../../Components/TextError";
import { UserInterface } from "../../Interfaces";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../Services/user.service";

const AccountInfoPage = () => {
  const [account, setAccount] = useState<UserInterface>({} as UserInterface);
  const { store } = React.useContext(Context);
  const [errorText, setErrorText] = useState<string | null>(null);
  useEffect(() => {
    try {
      store.setIsLoading(true);
      userService.fetchUser().then((response: any) => {
        setAccount(response.data.user);
      });
    } catch (error: any) {
      return;
    } finally {
      store.setIsLoading(false);
    }
  }, [store, account]);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  return (
    <div className="account-info-page">
      <Header />
      {!edit && (
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
              <b>Date of birth:</b> {account.birthDate}
            </div>
            <div className="info-line birth-place-line">
              <b>Birth place:</b> {account.birthPlace}
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
            <div className="info-line zip-line">
              <b>Zip:</b> {account.zip}
            </div>
            <div className="info-line passport-number-line">
              <b>Passport number:</b> {account.passportNumber}
            </div>
            <div className="info-line passport-issuing-date-line">
              <b>Passport issuing date:</b> {account.passportIssuingDate}
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
      {edit && (
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
              birthDate: account.birthDate,
              birthPlace: account.birthPlace,
              phoneNumber: account.phoneNumber,
              address: account.address,
              city: account.city,
              country: account.country,
              zip: account.zip,
              passportNumber: account.passportNumber,
              passportIssuingDate: account.passportIssuingDate,
              passportExpirationDate: account.passportExpirationDate,
              passportIssuingCountry: account.passportIssuingCountry,
            }}
            onSubmit={(values) => {
              try {
                userService.updateUser(values).then((response: any) => {
                  setAccount(response.data.user);
                  setEdit(false);
                });
              } catch (error: any) {
                setErrorText(error.response.data.message);
              }
              setEdit(false);
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              surname: Yup.string().required("Surname is required"),
              birthDate: Yup.date()
                .required("Date of birth is required")
                .transform((value, originalValue) => {
                  const date = moment(originalValue, "DD.MM.YYYY", true);
                  return date.isValid() ? date.toDate() : null;
                })
                .typeError("Not in format DD.MM.YYYY"),
              phoneNumber: Yup.string()
                .required("Required")
                .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
              address: Yup.string().required("Address is required"),
              city: Yup.string().required("City is required"),
              country: Yup.string().required("Country is required"),
              zip: Yup.string().required("Zip is required"),
              passportNumber: Yup.string().required(
                "Passport number is required"
              ),
              passportIssuingDate: Yup.date()
                .required("Passport issuing date is required")
                .transform((value, originalValue) => {
                  const date = moment(originalValue, "DD.MM.YYYY", true);
                  return date.isValid() ? date.toDate() : null;
                })
                .typeError("Not in format DD.MM.YYYY"),
              passportExpirationDate: Yup.date()
                .required("Passport expiration date is required")
                .transform((value, originalValue) => {
                  const date = moment(originalValue, "DD.MM.YYYY", true);
                  return date.isValid() ? date.toDate() : null;
                })
                .typeError("Not in format DD.MM.YYYY"),
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
                <div className="info-line date-of-birth-line">
                  <b>Date of birth:</b>
                  <Field
                    className="input-field"
                    name="birthDate"
                    type="text"
                    placeholder="Date of birth"
                  />
                  <ErrorMessage
                    name="birthDate"
                    component={TextError}
                    className="error-message"
                  />
                </div>
                <div className="info-line birth-place-line">
                  <b>Birth place:</b>
                  <Field
                    className="input-field"
                    name="birthPlace"
                    type="text"
                    placeholder="Birth place"
                  />
                  <ErrorMessage
                    name="birthPlace"
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
                <div className="info-line zip-line">
                  <b>Zip code:</b>
                  <Field
                    className="input-field"
                    name="zip"
                    type="text"
                    placeholder="Zip code"
                  />
                  <ErrorMessage
                    name="zip"
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
                <div className="info-line passport-issuing-date-line">
                  <b>Passport issuing date:</b>
                  <Field
                    className="input-field"
                    name="passportIssuingDate"
                    type="text"
                    placeholder="Passport issuing date"
                  />
                  <ErrorMessage
                    name="passportIssuingDate"
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
                  <b>Country of passport issue:</b>
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
      {errorText && (
        <ErrorModal
          message={errorText}
          handleOkay={() => setErrorText(null)}
          open={errorText ? true : false}
        />
      )}
    </div>
  );
};

export default AccountInfoPage;
