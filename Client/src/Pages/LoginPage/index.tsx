import "./index.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";

import { Context } from "../../index";
import ErrorModal from "../../Components/ErrorModal";
import React from "react";
import TextError from "../../Components/TextError";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface values {
  email: string;
  password: string;
}

const LoginPage = observer(() => {
  const { store } = React.useContext(Context);
  const [isErrorOpen, setIsErrorOpen] = React.useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });
  const onSubmit = async (values: values) => {
    
    await store.login(values.email, values.password);

    if (!store.isAuthorized) {
      setIsErrorOpen(true);
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h3>Please log in into the system </h3>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="login-form">
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <Field
                  className="input-field"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                />
                <ErrorMessage name="email" component={TextError} />
              </div>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <Field
                  className="input-field"
                  type="password"
                  name="password"
                  placeholder="********"
                />
                <ErrorMessage name="password" component={TextError} />
              </div>
              <div className="submit-button-container">
                <button className="submit-button" type="submit">
                  Login
                </button>
              </div>
            </div>
          </Form>
        </Formik>
        <div className="additional-login-container">
          <hr />
          <div className="links-container">
            <a href="/forgot-password">Forgot password?</a>
            <a href="/create-account">Create account</a>
          </div>
        </div>
      </div>
      {isErrorOpen && (
        <ErrorModal
          message={"Incorrect Credentials"}
          handleOkay={() => setIsErrorOpen(false)}
          open={isErrorOpen}
        />
      )}
    </div>
  );
});

export default LoginPage;
