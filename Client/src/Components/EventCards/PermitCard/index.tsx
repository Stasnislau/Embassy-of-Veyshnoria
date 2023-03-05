import "./../index.scss";
import "./index.scss";

import React from "react";
import { useNavigate } from "react-router-dom";

interface ResidencePermitCardProps {
  props: {
    dateOfSubmission: string;
    dateOfDecision: string;
    status: string;
    description: string;
  };
}

const ResidencePermitCard = ({ props }: ResidencePermitCardProps) => {
  const Navigate = useNavigate();
  return (
    <button
      className="residence-permit-card"
      onClick={() => {
        Navigate("/residence-permit");
      }}
    >
      <h1> Residence Permit </h1>
      <div className="residence-permit-card-body">
        <div className="residence-permit-card-date">
          <p>
            Date of submission: <b>2020-12-12</b>
          </p>
          <p>
            Date of decision: <b>2020-12-12</b>
          </p>
        </div>
        <div className="residence-permit-card-status">
          Status:{" "}
          <b
            className={
              props.status !== "Rejected" && props.status !== "Approved"
                ? "card-status-pending"
                : "card-status-over"
            }
          >
            {props.status}
          </b>
        </div>
        <div className="residence-permit-card-description">
          <p> Description: </p>
        </div>
      </div>
    </button>
  );
};

export default ResidencePermitCard;
