import "./index.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";

import ErrorModal from "../../Components/ErrorModal";
import React from "react";
import TextError from "../../Components/TextError";
import { UserDtoInterface } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import userService from "../../Services/user.service";

interface values {
  name: string;
  surname: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

const ForgotPassword = () => {
  const [errorText, setErrorText] = React.useState<string | null>(null);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const navigate = useNavigate();
  const onSubmit = async (values: values) => {
    const user: UserDtoInterface | null = (
      await userService.fetchUserDTO(values.email)
    ).data;
    if (!user) {
      setErrorText("User not found");
      return;
    }
    try {
      if (
        user.name === values.name &&
        user.surname === values.surname &&
        user.email === values.email
      ) {
        const changePassword = await userService.updatePassword(
          values.email,
          values.newPassword
        );
        if (changePassword.data) {
          navigate("/login");
        }
      } else {
        setErrorText("Invalid data");
      }
    } catch (error: any) {
      setErrorText(error.response.data.message);
    }
  };
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form-container">
        <h1>Forgot Password</h1>
        <Formik
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          initialValues={initialValues}
        >
          <Form>
            <div className="inputs-container">
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <Field
                  className="input-field"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email for your account"
                />

                <ErrorMessage name="email" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="name">Name</label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="input-field"
                />
                <ErrorMessage name="name" component={TextError} />
              </div>
              <div className="form-control">
                <label htmlFor="surname">Surname</label>
                <Field
                  id="surname"
                  name="surname"
                  type="text"
                  placeholder="Enter your surname"
                  className="input-field"
                />
                <ErrorMessage name="surname" component={TextError} />
              </div>
              <div className="form-control">
                <label htmlFor="newPassword">New Password</label>
                <Field
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  className="input-field"
                  placeholder="Enter your new password"
                />
                <ErrorMessage name="newPassword" component={TextError} />
              </div>
              <div className="form-control">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="input-field"
                  placeholder="Confirm your new password"
                />
                <ErrorMessage name="confirmPassword" component={TextError} />
              </div>
            </div>
            <div className="buttons-container">
              <button type="submit" className="submit-button">
                Change Password
              </button>
              <button
                className="back-button"
                type="button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Back
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      {errorText && (
        <ErrorModal
          open={Boolean(errorText)}
          handleOkay={() => setErrorText(null)}
          message={errorText}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
