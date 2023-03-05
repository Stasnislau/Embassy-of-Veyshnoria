import "./index.scss";

import React, { useState } from "react";

import Header from "../../Components/Header";
import SurenessModal from "../../Components/SurenessModal";

const VisitPage = (id: number) => {
  // try catch for extracting and finding id
  const visit = {
    id: 1,
    idOfAccount: 1,
    name: "John",
    surname: "Doe",
    email: "something@gmail.com",
    date: "2020-01-01",
    time: "12:00",
    location: "Some location",
    description: "Some description",
  };
  const found = true;
  const [open, setOpen] = useState(false);
  return (
    <div className="visit-page">
      <Header />
      {found && (
        <div className="visit-container">
          <h1 className="visit-page-title">Visit to the office</h1>
          <hr className="visit-page-line" />
          <div className="visit-fields-container">
            <div className="visit-field">
              <div className="visit-page-subtitle">Personal Information </div>
              <div className="visit-field name-field">
                Name: <span className="user-info">{visit.name}</span>
              </div>
              <div className="visit-field surname-field">
                {" "}
                Surname: <span className="user-info"> {visit.surname}</span>
              </div>
              <div className="visit-field email-field">
                {" "}
                Email: <span className="user-info"> {visit.email}</span>
              </div>
              <div className="visit-page-subtitle">Visit Information </div>
              <div className="visit-field date-field">
                {" "}
                Date: <span className="user-info">{visit.date}</span>
              </div>
              <div className="visit-field time-field">
                {" "}
                Time: <span className="user-info">{visit.time}</span>
              </div>
              <div className="visit-field location-field">
                {" "}
                Location: <span className="user-info">{visit.location}</span>
              </div>
              <div className="visit-field description-field">
                {" "}
                Description:{" "}
                <span className="user-info">{visit.description}</span>
              </div>
            </div>

            <div className="delete-button-container">
              <button
                className="delete-button"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <SurenessModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        handleConfirm={() => {
          // delete visit
          setOpen(false);
        }}
        text="delete this visit"
      />
      {!found && <h1 className="error-header">There no such visit</h1>}
    </div>
  );
};

export default VisitPage;
