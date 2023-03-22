import "./index.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";

import { Context } from "../../index";
import ErrorModal from "../../Components/ErrorModal";
import Header from "../../Components/Header";
import React from "react";
import { ResidencePermitApplicationFrontInterface } from "../../Interfaces";
import ResidenceService from "../../Services/residence.service";
import TextError from "../../Components/TextError";
import { UserInterface } from "../../Interfaces";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../Services/user.service";

const ResidencePermitApplication = () => {
  const [errorText, setErrorText] = React.useState<string | null>(null);
  const [userData, setUserData] = React.useState<UserInterface>(
    {} as UserInterface
  );

  const navigate = useNavigate();
  const { store } = React.useContext(Context);

  useEffect(() => {
    try {
      userService.fetchUser().then((response: any) => {
        setUserData(response.data.user);
      });
    } catch (error: any) {
      setErrorText(error.response.data.message);
    }
  }, [store]);
  const initialValues: ResidencePermitApplicationFrontInterface = {
    name: userData.name,
    surname: userData.surname,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    birthDate: userData.birthDate,
    birthPlace: userData.birthPlace,
    address: userData.address,
    city: userData.city,
    country: userData.country,
    zip: userData.zip,
    residencePermitType: "",
    passportNumber: userData.passportNumber,
    passportIssuingCountry: userData.passportIssuingCountry,
    passportExpirationDate: userData.passportExpirationDate,
    passportIssuingDate: userData.passportIssuingDate,
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
    residencePermitType: Yup.string().required("Required"),
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
  const onSubmit = async (values: ResidencePermitApplicationFrontInterface) => {
    try {
      await ResidenceService.createPermitApplication({
        name: values.name,
        surname: values.surname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        birthDate: values.birthDate,
        birthPlace: values.birthPlace,
        address: values.address,
        city: values.city,
        country: values.country,
        zip: values.zip,
        residencePermitType: values.residencePermitType,
        passportNumber: values.passportNumber,
        passportIssuingCountry: values.passportIssuingCountry,
        passportExpirationDate: values.passportExpirationDate,
        passportIssuingDate: values.passportIssuingDate,
        description: values.description,
      });
      navigate("/dashboard");
    } catch (error: any) {
      setErrorText(error.response.data.message);
    }
  };

  return (
    <div className="residence-permit-application">
      <Header />
      <div className="residence-permit-application-container">
        <h1>Residence Permit Application</h1>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="input-container">
              <div className="several-fields-container">
                <div className="form-control">
                  <label htmlFor="firstName">Name</label>
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
                    type="text"
                    id="birthDate"
                    placeholder="dd.mm.yyyy"
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
                  <label htmlFor="zip">Zip</label>
                  <Field
                    type="text"
                    id="zip"
                    name="zip"
                    className="input-field"
                  />
                  <ErrorMessage name="zip" component={TextError} />
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="residencePermitType">
                  Residence Permit Type
                </label>
                <Field
                  component="select"
                  id="residencePermitType"
                  name="residencePermitType"
                  className="input-selector"
                >
                  <option value="">Select type</option>
                  <option value="long">Work</option>
                  <option value="short">Student</option>
                  <option value="permanent">Permanent</option>
                </Field>
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
                    type="text"
                    id="passportExpirationDate"
                    name="passportExpirationDate"
                    placeholder="dd.mm.yyyy"
                    className="input-field"
                  />
                  <ErrorMessage
                    name="passportExpirationDate"
                    component={TextError}
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="passportIssuingDate">
                    Passport Date of Issue
                  </label>
                  <Field
                    type="text"
                    id="passportIssuingDate"
                    name="passportIssuingDate"
                    className="input-field"
                    placeholder="dd.mm.yyyy"
                  />
                  <ErrorMessage
                    name="passportIssuingDate"
                    component={TextError}
                  />
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="description">Comments</label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                  className="input-field"
                />
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
      </div>

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

export default ResidencePermitApplication;
