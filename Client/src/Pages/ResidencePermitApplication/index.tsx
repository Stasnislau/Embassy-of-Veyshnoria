import "./index.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";

import Header from "../../Components/Header";
import React from "react";
import TextError from "../../Components/TextError";
import { useNavigate } from "react-router-dom";

interface ResidencePermitValues {
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
  checkbox_fingerprints: boolean;
  checkbox_terms: boolean;
}

const ResidencePermitApplication = () => {
  const navigate = useNavigate();
  const initialValues: ResidencePermitValues = {
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    birthPlace: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    residencePermitType: "",
    passportNumber: "",
    passportIssuingCountry: "",
    passportExpirationDate: "",
    passportIssuingDate: "",
    comments: "",
    checkbox_fingerprints: false,
    checkbox_terms: false,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .test(
        "len",
        "Must be exactly 10 characters",
        (val) => val?.length === 10
      ), // TODO: Add regex for phone number
    birthDate: Yup.string().required("Required"),
    birthPlace: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    zipCode: Yup.string().required("Required"),
    residencePermitType: Yup.string().required("Required"),
    passportNumber: Yup.string().required("Required"),
    passportIssuingCountry: Yup.string().required("Required"),
    passportExpirationDate: Yup.string().required("Required"),
    passportIssuingDate: Yup.string().required("Required"),
    comments: Yup.string(),
    checkbox_fingerprints: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
    checkbox_terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const onSubmit = (values: ResidencePermitValues) => {
    console.log("Form data", values);
  };

  return (
    <div className="residence-permit-application">
      <Header />
      <div className="residence-permit-application-container">
        <h1>Residence Permit Application</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="input-container">
              <div className="several-fields-container">
                <div className="form-control">
                  <label htmlFor="firstName">name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="input-field"
                  />
                  <ErrorMessage name="name" component={TextError} />
                </div>
                <div className="form-control">
                  <label htmlFor="surname">Surname</label>
                  <Field
                    type="text"
                    id="surname"
                    name="surname"
                    className="input-field"
                  />
                  <ErrorMessage name="surname" component={TextError} />
                </div>
              </div>
              <div className="several-fields-container">
                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="input-field"
                  />
                  <ErrorMessage name="email" component={TextError} />
                </div>
                <div className="form-control">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Field
                    type="text"
                    id="phoneNumber"
                    placeholder="+XXXXXXXXX"
                    name="phoneNumber"
                    className="input-field"
                  />
                  <ErrorMessage name="phoneNumber" component={TextError} />
                </div>
              </div>
              <div className="several-fields-container">
                <div className="form-control">
                  <label htmlFor="birthDate">Birth Date</label>
                  <Field
                    type="date"
                    id="birthDate"
                    placeholder="dd-mm-yyyy"
                    name="birthDate"
                    className="input-field"
                  />
                  <ErrorMessage name="birthDate" component={TextError} />
                </div>
                <div className="form-control">
                  <label htmlFor="birthPlace">Birth Place</label>
                  <Field
                    placeholder="City"
                    type="text"
                    id="birthPlace"
                    name="birthPlace"
                    className="input-field"
                  />
                  <ErrorMessage name="birthPlace" component={TextError} />
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="address">Address</label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Street, number, apartment"
                  className="input-field"
                />
                <ErrorMessage name="address" component={TextError} />
              </div>
              <div className="several-fields-container">
                <div className="form-control">
                  <label htmlFor="city">City</label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className="input-field"
                  />
                  <ErrorMessage name="city" component={TextError} />
                </div>
                <div className="form-control">
                  <label htmlFor="country">Country</label>
                  <Field
                    type="text"
                    id="country"
                    name="country"
                    className="input-field"
                  />
                  <ErrorMessage name="country" component={TextError} />
                </div>
                <div className="form-control">
                  <label htmlFor="zipCode">Zip Code</label>
                  <Field
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="input-field"
                  />
                  <ErrorMessage name="zipCode" component={TextError} />
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="residencePermitType">
                  Residence Permit Type
                </label>
                <select
                  id="residencePermitType"
                  name="residencePermitType"
                  className="input-selector"
                >
                  <option value="long">Work</option>
                  <option value="short">Student</option>
                  <option value="permanent">Permanent</option>
                </select>
                <ErrorMessage
                  name="residencePermitType"
                  component={TextError}
                />
              </div>
              <div className="form-control">
                <label htmlFor="passportNumber">Passport Number</label>
                <Field
                  type="text"
                  id="passportNumber"
                  name="passportNumber"
                  className="input-field"
                />
                <ErrorMessage name="passportNumber" component={TextError} />
              </div>
              <div className="several-fields-container">
                <div className="form-control">
                  <label htmlFor="passportIssuingCountry">
                    Country issued passport
                  </label>
                  <Field
                    type="text"
                    id="passportIssuingCountry"
                    name="passportIssuingCountry"
                    className="input-field"
                  />
                  <ErrorMessage
                    name="passportIssuingCountry"
                    component={TextError}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="passportExpirationDate">
                    Passport Expiration Date
                  </label>
                  <Field
                    type="date"
                    id="passportExpirationDate"
                    name="passportExpirationDate"
                    className="input-field"
                  />
                  <ErrorMessage
                    name="passportExpirationDate"
                    component={TextError}
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="passportIssuingDate">
                    Passport Issuing Date
                  </label>
                  <Field
                    type="date"
                    id="passportIssuingDate"
                    name="passportIssuingDate"
                    className="input-field"
                  />
                  <ErrorMessage
                    name="passportIssuingDate"
                    component={TextError}
                  />
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="comments">Comments</label>
                <Field
                  type="text"
                  id="comments"
                  name="comments"
                  className="input-field"
                />
              </div>
            </div>
            <div className="checkbox-container">
              <div className="checkbox-item">
                <Field
                  type="checkbox"
                  name="checkbox_fingerprints"
                  className="checkbox"
                />
                <label htmlFor="checkbox_fingerprints">
                  I agree to submit my fingerprints to the embassy.
                </label>
              </div>
              <div className="checkbox-item">
                <Field
                  type="checkbox"
                  name="checkbox_conditions"
                  className="checkbox"
                />
                <label htmlFor="checkbox_conditions">
                  I agree to the terms and conditions.
                </label>
              </div>

              <ErrorMessage name="checkbox" component={TextError} />
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
            <ErrorMessage name="checkbox_conditions" component={TextError} />
            <ErrorMessage name="checkbox_fingerprints" component={TextError} />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ResidencePermitApplication;
