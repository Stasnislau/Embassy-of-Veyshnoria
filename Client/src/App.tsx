import "./App.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import AccountPage from "./Pages/AccountInfoPage";
import { Context } from "./index";
import CreateAccountPage from "./Pages/CreateAccountPage";
import Dashboard from "./Pages/Dashboard";
import Footer from "./Components/Footer";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import LoginPage from "./Pages/LoginPage";
import React from "react";
import ResidenceInfoPage from "./Pages/InformationPages/ResidenceInfoPage";
import ResidencePermitApplication from "./Pages/ResidencePermitApplication";
import ResidencePermitPage from "./Pages/ResidencePermitPage";
import ResidencePermits from "./Pages/ResidencePermits";
import VisaApplication from "./Pages/VisaApplication";
import VisaInfoPage from "./Pages/InformationPages/VisaInfoPage";
import VisaPage from "./Pages/VisaPage";
import VisasPage from "./Pages/Visas";
import VisitPage from "./Pages/VisitPage";
import VisitsPage from "./Pages/Visits";
import { useEffect } from "react";

function App() {
  const { store } = React.useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuthorization();
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="app-body">
          <Routes>
            <Route path="/login" element={<LoginPage />} caseSensitive></Route>
            <Route
              path="/create-account"
              element={<CreateAccountPage />}
            ></Route>
            <Route
              path="/forgot-password"
              element={<ForgotPasswordPage />}
            ></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route
              path="/visa-application"
              element={<VisaApplication />}
            ></Route>
            <Route
              path="/residence-application"
              element={<ResidencePermitApplication />}
            ></Route>
            <Route path="/account" element={<AccountPage />}></Route>
            <Route path="/visits" element={<VisitsPage />}></Route>
            <Route path="/visit" element={<VisitPage />}></Route>
            <Route path="/visa-info" element={<VisaInfoPage />}></Route>
            <Route
              path="/residence-info"
              element={<ResidenceInfoPage />}
            ></Route>
            <Route path="/visa" element={<VisaPage />}></Route>
            <Route
              path="/residence-permit"
              element={<ResidencePermitPage />}
            ></Route>
            <Route
              path="/residence-permits"
              element={<ResidencePermits />}
            ></Route>
            <Route path="/visas" element={<VisasPage />}></Route>

            <Route path="*" element={<Navigate to="/login" />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
