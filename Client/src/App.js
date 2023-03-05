import "./App.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import AccountPage from "../src/Pages/AccountInfoPage";
import CreateAccountPage from "../src/Pages/CreateAccountPage";
import Dashboard from "../src/Pages/Dashboard";
import Footer from "../src/Components/Footer";
import ForgotPasswordPage from "../src/Pages/ForgotPasswordPage";
import LoginPage from "../src/Pages/LoginPage";
import React from "react";
import ResidenceInfoPage from "../src/Pages/InformationPages/ResidenceInfoPage";
import ResidencePermitApplication from "../src/Pages/ResidencePermitApplication";
import ResidencePermitPage from "../src/Pages/ResidencePermitPage";
import ResidencePermits from "../src/Pages/ResidencePermits";
import VisaApplication from "../src/Pages/VisaApplication";
import VisaInfoPage from "../src/Pages/InformationPages/VisaInfoPage";
import VisaPage from "../src/Pages/VisaPage";
import VisasPage from "../src/Pages/Visas";
import VisitPage from "../src/Pages/VisitPage";
import VisitsPage from "../src/Pages/Visits";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app-body">
          <Routes>
            <Route exact path="/login" element={<LoginPage />}></Route>
            <Route
              exact
              path="/create-account"
              element={<CreateAccountPage />}
            ></Route>
            <Route
              exact
              path="/forgot-password"
              element={<ForgotPasswordPage />}
            ></Route>
            <Route exact path="/dashboard" element={<Dashboard />}></Route>
            <Route
              exact
              path="/visa-application"
              element={<VisaApplication />}
            ></Route>
            <Route
              exact
              path="/residence-application"
              element={<ResidencePermitApplication />}
            ></Route>
            <Route exact path="/account" element={<AccountPage />}></Route>
            <Route exact path="/visits" element={<VisitsPage />}></Route>
            <Route exact path="/visit" element={<VisitPage />}></Route>
            <Route exact path="/visa-info" element={<VisaInfoPage />}></Route>
            <Route
              exact
              path="/residence-info"
              element={<ResidenceInfoPage />}
            ></Route>
            <Route exact path="/visa" element={<VisaPage />}></Route>
            <Route
              exact
              path="/residence-permit"
              element={<ResidencePermitPage />}
            ></Route>
            <Route
              exact
              path="/residence-permits"
              element={<ResidencePermits />}
            ></Route>
            <Route exact path="/visas" element={<VisasPage />}></Route>

            <Route path="*" element={<Navigate to="/login" />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
