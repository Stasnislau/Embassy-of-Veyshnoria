import "./index.scss";

import React, { useState } from "react";

import { Context } from "../..";
import ErrorModal from "../../Components/ErrorModal";
import Header from "../../Components/Header";
import SurenessModal from "../../Components/SurenessModal";
import { VisitInterface } from "../../Interfaces";
import VisitService from "../../Services/visit.service";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const VisitPage = () => {
  const id = useParams().id as string;
  const { store } = React.useContext(Context);
  const [visit, setVisit] = useState({} as VisitInterface);
  const user = {
    name: store.user.name,
    surname: store.user.surname,
    email: store.user.email,
  };
  const [errorText, setErrorText] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        store.setIsLoading(true);
        const response = await VisitService.fetchVisitById(id);
        setVisit(response.data);
      } catch (error: any) {
        setErrorText(error.response.data.message);
      } finally {
        store.setIsLoading(false);
      }
    })();
  }, [id, store.isLoading]);

  const [open, setOpen] = useState(false);
  return (
    <div className="visit-page">
      <Header />
      <div className="visit-container">
        <h1 className="visit-page-title">Visit to the office</h1>
        <hr className="visit-page-line" />
        <div className="visit-fields-container">
          <div className="visit-field">
            <div className="visit-page-subtitle">Personal Information </div>
            <div className="visit-field name-field">
              Name: <span className="user-info">{user.name}</span>
            </div>
            <div className="visit-field surname-field">
              {" "}
              Surname: <span className="user-info"> {user.surname}</span>
            </div>
            <div className="visit-field email-field">
              {" "}
              Email: <span className="user-info"> {user.email}</span>
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
      {errorText && (
        <ErrorModal
          message={errorText}
          open={Boolean(errorText)}
          handleOkay={() => {
            setErrorText(null);
          }}
        />
      )}
    </div>
  );
};

export default VisitPage;
