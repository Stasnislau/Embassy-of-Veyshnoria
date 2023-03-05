import "./index.scss";

import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

interface values {
  email: string;
  password: string;
}
const LoginPage = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleLogin = () => {
    navigate("/dashboard");
  };
  const onSubmit = (values: values) => {
    handleLogin();
  };
  const validate = (values: values) => {
    let errors: Partial<values> = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h3>Please log in into the system </h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              className="input-field"
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              placeholder="example@gmail.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              className="input-field"
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              placeholder="********"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="submit-button-container">
            <button className="submit-button" type="submit">
              Login
            </button>
          </div>
          <hr />
          <div className="links-container">
            <a href="/forgot-password">Forgot password?</a>
            <a href="/create-account">Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
