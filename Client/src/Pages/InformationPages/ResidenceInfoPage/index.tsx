import "./index.scss";

import Header from "../../../Components/Header";
import React from "react";

const ResidencePermitInfo = () => {
  return (
    <div className="residence-permit-info-page">
      <Header />
      <div className="residence-permit-info">
        <h1 className="residence-permit-info-title">
          Information about Residence Permits
        </h1>

        <h2 className="residence-permit-info-section-title">
          Who needs a Residence Permit?
        </h2>
        <div className="residence-permit-info-section-content">
          <p>
            Anyone who plans to reside in Veyshnoria for more than 90 days in a
            six-month period needs to apply for a Residence Permit.
          </p>
        </div>
        <hr className="info-line" />

        <h2 className="residence-permit-info-section-title">
          What do I need to apply for a Residence Permit?
        </h2>
        <div className="residence-permit-info-section-content">
          <p>
            To apply for a Residence Permit, you will need to provide the
            following documents:
          </p>
          <ul>
            <li>A valid passport</li>
            <li>A visa (if applicable)</li>
            <li>Proof of financial support</li>
            <li>Proof of health insurance</li>
            <li>A rental agreement or proof of accommodation</li>
            <li>Police clearance certificate (if applicable)</li>
          </ul>
          <p>
            You may also need to provide additional documents depending on your
            specific circumstances.
          </p>
        </div>
        <hr className="info-line" />

        <h2 className="residence-permit-info-section-title">
          How long does it take to process a Residence Permit application?
        </h2>
        <div className="residence-permit-info-section-content">
          <p>
            The processing time for a Residence Permit application can vary
            depending on a number of factors, such as the time of year and the
            volume of applications being processed. However, in general, you can
            expect it to take anywhere from a few weeks to a few months.
          </p>
        </div>
        <hr className="info-line" />

        <h2 className="residence-permit-info-section-title">
          What are the fees for a Residence Permit?
        </h2>
        <div className="residence-permit-info-section-content">
          <p>
            The fees for a Residence Permit can vary depending on the length of
            stay, your nationality, and other factors. You should contact the
            Vejshnorian embassy or consulate in your country for information on
            the fees that apply to your specific situation.
          </p>
        </div>
        <hr className="info-line" />

        <h2 className="residence-permit-info-section-title">
          Can I work with a Residence Permit?
        </h2>
        <div className="residence-permit-info-section-content">
          <p>
            If you are granted a Residence Permit, you will be allowed to work
            in Vejshnoria without the need for an additional work permit.
            However, you must ensure that the work you do is legal and that you
            are paying the appropriate taxes.
          </p>
        </div>

        <p className="additional-info">
          For more information about Residence Permits and the application
          process, please contact the embassy or consulate directly.
        </p>
      </div>
    </div>
  );
};

export default ResidencePermitInfo;