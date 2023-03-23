import "./index.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { UserInterface, VisaApplicationFrontInterface } from "../../Interfaces";
import { useEffect, useState } from "react";

import ErrorModal from "../../Components/ErrorModal";
import Header from "../../Components/Header";
import React from "react";
import TextError from "../../Components/TextError";
import VisaService from "../../Services/visa.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import userService from "../../Services/user.service";

const VisaApplication = () => {
  const [user, setUser] = useState<UserInterface>({} as UserInterface);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    try {
      userService.fetchUser().then((response: any) => {
        setUser(response.data.user);
      });
    } catch (error: any) {
      return;
    }
  }, []);

  const initialValues: VisaApplicationFrontInterface = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    birthDate: user.birthDate,
    birthPlace: user.birthPlace,
    phoneNumber: user.phoneNumber,
    address: user.address,
    city: user.city,
    country: user.country,
    zip: user.zip,
    passportNumber: user.passportNumber,
    passportIssuingDate: user.passportIssuingDate,
    passportExpirationDate: user.passportExpirationDate,
    passportIssuingCountry: user.passportIssuingCountry,
    visaType: "",
    visaDuration: "",
    visaDate: "",
    description: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
    birthDate: Yup.date()
      .required("Date of birth is required")
      .transform((value, originalValue) => {
        const date = moment(originalValue, "DD.MM.YYYY", true);
        return date.isValid() ? date.toDate() : null;
      })
      .typeError("Not in format DD.MM.YYYY"),
    birthPlace: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
    visaDate: Yup.date()
      .required("Required")
      .transform((value, originalValue) => {
        const date = moment(originalValue, "DD.MM.YYYY", true);
        if (date.isBefore(moment())) {
          return null;
        }
        return date.isValid() ? date.toDate() : null;
      })
      .typeError("Not in format DD.MM.YYYY"),
    visaDuration: Yup.string().required("Required"),
    visaType: Yup.string().required("Required"),
    passportNumber: Yup.string().required("Required"),
    passportIssuingCountry: Yup.string().required("Required"),
    passportIssuingDate: Yup.date()
      .required("Passport Issuing Date is required")
      .transform((value, originalValue) => {
        const date = moment(originalValue, "DD.MM.YYYY", true);
        return date.isValid() ? date.toDate() : null;
      })
      .typeError("Not in format DD.MM.YYYY"),
    passportExpirationDate: Yup.date()
      .required("Expiration Date is required")
      .transform((value, originalValue) => {
        const date = moment(originalValue, "DD.MM.YYYY", true);
        return date.isValid() ? date.toDate() : null;
      })
      .typeError("Not in format DD.MM.YYYY"),
    description: Yup.string(),
  });
  const navigate = useNavigate();
  const onSubmit = async (values: VisaApplicationFrontInterface) => {
    try {
      const response = await VisaService.createVisaApplication(values);
      if (response) {
        navigate("/dashboard");
      }
    } catch (error: any) {
      setErrorText(error.response.data.message);
    }
  };
  return (
    <div className="visa-application-container">
      <Header />
      <div className="visa-application-form-container">
        <h1>Visa Application</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          <Form>
            <div className="inputs-container">
              <div className="several-fields-container">
                <div className="form-control">
                  <label htmlFor="firstName">Name</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="first-name-field input-field"
                  />
                  <ErrorMessage name="firstName" component={TextError} />
                </div>
                <div className="form-control">
                  <label htmlFor="surname">Surname</label>
                  <Field
                    id="surname"
                    name="surname"
                    type="text"
                    className="last-name-field input-field"
                  />
                  <ErrorMessage name="surname" component={TextError} />
                </div>
              </div>
              <div className="several-fields-container">
                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="exam@ple.smt"
                    className="email-field input-field"
                  />
                  <ErrorMessage name="email" component={TextError} />
                </div>
                <div className="form-control">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="+XXXXXXXXXXX"
                    className="phone-field input-field"
                  />
                  <ErrorMessage name="phone" component={TextError} />
                </div>
              </div>

              <div className="several-fields-container">
                <div className="form-control">
                  <label htmlFor="birthDate">Birth date</label>
                  <Field
                    id="birthDate"
                    name="birthDate"
                    type="text"
                    placeholder="DD.MM.YYYY"
                    className="birth-date-field input-field"
                  />
                  <ErrorMessage name="birthDate" component={TextError} />
                </div>
                <div className="form-control">
                  <label htmlFor="birthPlace">Birth place</label>
                  <Field
                    id="birthPlace"
                    name="birthPlace"
                    type="text"
                    className="birth-place-field input-field"
                  />
                  <ErrorMessage name="birthPlace" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="passportNumber">Passport Number</label>
                <Field
                  id="passportNumber"
                  name="passportNumber"
                  type="text"
                  placeholder="ABXXXXXXXX"
                  className="passport-number-field input-field"
                />
                <ErrorMessage name="passportNumber" component={TextError} />
              </div>
              <div className="several-fields-container">
                <div className="form-control">
                  <label htmlFor="passportIssuingCountry">
                    Country of issue
                  </label>
                  <Field
                    id="passportIssuingCountry"
                    name="passportIssuingCountry"
                    type="text"
                    className="passport-country-field input-field"
                  />
                  <ErrorMessage name="passportCountry" component={TextError} />
                </div>
                <div className="form-control">
                  <label htmlFor="passportIssuingDate">
                    Passport issuing date
                  </label>
                  <Field
                    id="passportIssuingDate"
                    name="passportIssuingDate"
                    type="text"
                    placeholder="dd.mm.yyyy"
                    className="passport-issuing-date-field input-field"
                  />
                  <ErrorMessage
                    name="passportIssuingDate"
                    component={TextError}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="passportExpiration">
                    Passport Expiration
                  </label>
                  <Field
                    id="passportExpirationDate"
                    name="passportExpirationDate"
                    type="text"
                    placeholder="dd.mm.yyyy"
                    className="passport-expiration-date-field input-field"
                  />
                  <ErrorMessage
                    name="passportExpiration"
                    component={TextError}
                  />
                </div>
              </div>
              <div className="address-container">
                <div className="form-control">
                  <label htmlFor="address">Address</label>
                  <Field
                    id="address"
                    name="address"
                    type="text"
                    placeholder="street, house, flat"
                    className="address-field input-field"
                  />
                  <ErrorMessage name="address" component={TextError} />
                </div>
              </div>
              <div className="several-fields-container">
                <div className="form-control">
                  <label htmlFor="country">Country</label>
                  <Field
                    id="country"
                    name="country"
                    type="text"
                    className="country-field input-field"
                  />
                  <ErrorMessage name="country" component={TextError} />
                </div>
                <div className="form-control">
                  <label htmlFor="city">City</label>
                  <Field
                    id="city"
                    name="city"
                    type="text"
                    className="city-field input-field"
                  />
                  <ErrorMessage name="city" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="zip">Zip</label>
                  <Field
                    id="zip"
                    name="zip"
                    type="text"
                    placeholder="Your post code"
                    className="zip-field input-field"
                  />
                  <ErrorMessage name="zip" component={TextError} />
                </div>
              </div>
              <div className="several-fields-container">
                <div className="form-control">
                  <label htmlFor="visaDate">Visa starting date</label>
                  <Field
                    id="visaDate"
                    name="visaDate"
                    type="text"
                    placeholder="dd.mm.yyyy"
                    className="visa-date-field input-field"
                  />
                  <ErrorMessage name="visaDate" component={TextError} />
                </div>
                <div className="form-control">
                  <label htmlFor="visaType">Visa Type</label>
                  <Field
                    component="select"
                    className="input-selector"
                    name="visaType"
                    id="visaType"
                    defaultValue="A Tourist"
                  >
                    <option value="">Please select</option>
                    <option value="C Tourist">C Tourist</option>
                    <option value="C Transit">C Transit</option>
                    <option value="D Business">D Business</option>
                    <option value="D Student">D Student</option>
                    <option value="D Work">D Work</option>
                    <option value="D Refugee">D Transit</option>
                  </Field>
                </div>
                <div className="form-control">
                  <label htmlFor="visaDuration">Visa Duration</label>
                  <Field
                    className="input-selector"
                    component="select"
                    name="visaDuration"
                    id="visaDuration"
                    defaultValue="1 Month"
                  >
                    <option value="">Please select</option>
                    <option value="1 Month">1 Month</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Years">2 Years</option>
                  </Field>
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="comments">Additional comments</label>
                <Field
                  id="comments"
                  name="comments"
                  type="text"
                  placeholder="Write any additional information here"
                  className="comments-field input-field"
                />
                <ErrorMessage name="comments" component={TextError} />
              </div>
            </div>

            <div className="buttons-container">
              <button type="submit" className="submit-button">
                Submit
              </button>
              <button
                type="reset"
                className="cancel-button"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
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
    </div>
  );
};
export default VisaApplication;
