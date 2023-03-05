import "./index.scss";
import "./../index.scss";

import React from "react";
import { useNavigate } from "react-router-dom";

interface VisitCardProps {
  props: {
    date: string;
    time: string;
    location: string;
    description: string;
  };
}

const VisitCard = ({ props }: VisitCardProps) => {
  const Navigate = useNavigate();
  return (
    <button
      className="visit-card"
      onClick={() => {
        Navigate("/visit");
      }}
    >
      <h1> Visit to the office </h1>
      <div className="visit-card-body">
        <div className="visit-card-date">
          <p>
            Date: <b>{props.date}</b>
          </p>
          <p>
            Time: <b>{props.time}</b>{" "}
          </p>
        </div>
        <div className="visit-card-location">
          <p>
            Where: <b>{props.location}</b>{" "}
          </p>
        </div>
        <div className="visit-card-description">
          <p> Description: {props.description} </p>
        </div>
      </div>
    </button>
  );
};

export default VisitCard;
