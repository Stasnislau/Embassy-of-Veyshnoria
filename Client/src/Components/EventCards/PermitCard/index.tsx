import "./../index.scss";
import "./index.scss";

import React from "react";
import { useNavigate } from "react-router-dom";

interface ResidencePermitCardProps {
  props: {
    id: string;
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
        Navigate(`/residence-permit/${props.id}`);
      }}
    >
      <h1> Residence Permit </h1>
      <div className="residence-permit-card-body">
        <div className="residence-permit-card-date">
          <p>
            Date of submission: <b>{props.dateOfSubmission}</b>
          </p>
          <p>
            Date of decision: <b>{props.dateOfDecision}</b>
          </p>
        </div>
        <div className="residence-permit-card-status">
          Status: {props.status}
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
          <p> Description: {props.description}</p>
        </div>
      </div>
    </button>
  );
};

export default ResidencePermitCard;
