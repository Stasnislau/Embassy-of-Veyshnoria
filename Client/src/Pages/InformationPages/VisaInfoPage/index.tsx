import "./index.scss";

import Header from "../../../Components/Header";
import React from "react";

const VisaInformation = () => {
  return (
    <div className="visa-info-page">
      <Header />
      <div className="visa-info">
        <h1 className="visa-info-title">
          Information about Vejshnorian Visas
        </h1>

        <h2 className="visa-info-section-title">Who Can Apply?</h2>
        <div className="visa-info-section-content">
          <p>
            Visa requirements vary depending on the purpose of your visit.
            Typically, the following people are eligible to apply:
          </p>
          <ul>
            <li>Business travelers</li>
            <li>Tourists</li>
            <li>Students</li>
          </ul>
        </div>
        <hr className="info-line" />
        <h2 className="visa-info-section-title">Required Documents</h2>
        <div className="visa-info-section-content">
          <p>
            The required documents vary depending on the purpose of your visit.
            Below are some examples:
          </p>
          <ul>
            <li>
              Business travelers:
              <ul>
                <li>Valid passport</li>
                <li>Business invitation letter</li>
                <li>Proof of financial support</li>
              </ul>
            </li>
            <li>
              Tourists:
              <ul>
                <li>Valid passport</li>
                <li>Travel itinerary</li>
                <li>Proof of financial support</li>
              </ul>
            </li>
            <li>
              Students:
              <ul>
                <li>Valid passport</li>
                <li>Acceptance letter from a Vejshnorian university</li>
                <li>Proof of financial support</li>
              </ul>
            </li>
          </ul>
        </div>
        <hr className="info-line" />
        <h2 className="visa-info-section-title">How Long Should I Wait?</h2>
        <div className="visa-info-section-content">
          <p>
            Visa processing times vary depending on the type of visa and the
            purpose of your visit. Generally, it can take anywhere from a few
            days to several weeks to process your visa application.
          </p>
        </div>
        <hr className="info-line" />
        <h2 className="visa-info-section-title">What fees should I pay?</h2>
        <div className="visa-info-section-content">
          <p>
            Visa fees also vary depending on the type of visa and the purpose of
            your visit. You may also need to pay additional fees for other
            services such as expedited processing or visa delivery.
          </p>
        </div>

       

        <p className="additional-info">
          For more information about visa requirements and the application
          process, please contact the embassy directly.
        </p>
      </div>
    </div>
  );
};

export default VisaInformation;
