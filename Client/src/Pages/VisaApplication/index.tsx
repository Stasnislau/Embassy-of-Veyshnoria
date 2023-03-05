import "./index.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";

import Header from "../../Components/Header";
import React from "react";
import TextError from "../../Components/TextError";
import { useNavigate } from "react-router-dom";

interface VisaValues {
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
  checkbox_fingerprints: boolean;
  checkbox_conditions: boolean;
}

const VisaApplication = () => {
  const initialValues: VisaValues = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    passportNumber: "",
    passportExpiration: "",
    passportCountry: "",
    visaType: "",
    visaDuration: "",
    visaDate: "",
    comments: "",
    checkbox_fingerprints: false,
    checkbox_conditions: false,
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .min(1, "Name is too short")
      .max(20, "Name is too long"),
    surname: Yup.string()
      .required("Required")
      .min(1, "Surname is too short")
      .max(20, "Surname is too long"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string().required("Required"),
    passportNumber: Yup.string().required("Required"),
    passportExpiration: Yup.string().required("Required"),
    passportCountry: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
    visaDate: Yup.string().required("Required"),
    checkbox_conditions: Yup.boolean().test(
      "checkbox_conditions",
      "You must accept the terms and conditions",
      (value) => {
        return value === true;
      }
    ),
    checkbox_fingerprints: Yup.boolean().test(
      "checkbox_fingerprints",
      "You must accept the terms and conditions",
      (value) => {
        return value === true;
      }
    ),
  });
  const navigate = useNavigate();
  const onSubmit = (values: VisaValues) => {
    console.log(values);
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
                  <label htmlFor="phone">Phone</label>
                  <Field
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="+XXXXXXXXXXX"
                    className="phone-field input-field"
                  />
                  <ErrorMessage name="phone" component={TextError} />
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
                  <label htmlFor="passportExpiration">
                    Passport Expiration
                  </label>
                  <Field
                    id="passportExpiration"
                    name="passportExpiration"
                    type="text"
                    placeholder="mm/yyyy"
                    className="passport-expiration-field input-field"
                  />
                  <ErrorMessage
                    name="passportExpiration"
                    component={TextError}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="passportCountry">Country of issue</label>
                  <Field
                    id="passportCountry"
                    name="passportCountry"
                    type="text"
                    className="passport-country-field input-field"
                  />
                  <ErrorMessage name="passportCountry" component={TextError} />
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
                  <label htmlFor="visaDate">Visa valid from</label>
                  <Field
                    id="visaDate"
                    name="visaDate"
                    type="text"
                    placeholder="dd/mm/yyyy"
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
export default VisaApplication;

// TODO: use React Calendar for date input