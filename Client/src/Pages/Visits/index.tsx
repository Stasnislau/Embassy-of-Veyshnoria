import "./index.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import Header from "../../Components/Header";
import Modal from "@mui/material/Modal";
import PaginationComponent from "../../Components/Pagination";
import TextError from "../../Components/TextError";
import VisitCard from "../../Components/EventCards/VisitCard";
import plusIcon from "../../Pictures/plus.svg";

interface visitInterface {
  date: string;
  time: string;
  location: string;
  description: string;
}

const VisitsPage = () => {
  const [visits, setVisits] = useState<visitInterface[]>([
    {
      date: "2020-12-12",
      time: "12:00",
      location: "1 Main Street, New York, NY 10001",
      description: "Visit to submit documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "2 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "3 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "4 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "5 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "6 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "7 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "8 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "9 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "10 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "11 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "12 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "13 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "14 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "15 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "16 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "17 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "18 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "19 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "20 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "21 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "22 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "23 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "24 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "25 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "26 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "27 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "28 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
    {
      date: "2020-12-12",
      time: "12:00",
      location: "29 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
  ]);
  const [maxPages, setMaxPages] = useState(Math.ceil(visits.length / 6));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setMaxPages(Math.ceil(visits.length / 6));
  }, [visits.length]);
  const validationSchema = Yup.object().shape({
    date: Yup.string().required("Required"),
    time: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });
  const checkNumberToSliceBegin = () => {
    if (currentPage === 1) return 0;
    else return (currentPage - 1) * 6 - 1;
  };
  const checkNumberToSliceEnd = () => {
    return currentPage * 6 - 1;
  };
  const initialValues = {
    date: "",
    time: "",
    location: "10 Main Street, New York, NY 10001",
    description: "Submission of new documents",
  };
  const onSubmit = (values: visitInterface) => {
    setVisits((prevVisits) => [...prevVisits, values]);
    setMaxPages(Math.ceil(visits.length / 6));
    setOpenedNewVisit(false);
  };
  const [openedNewVisit, setOpenedNewVisit] = useState(false);

  return (
    <div className="visits-page-container">
      <Header />
      <div className="visits-page-body">
        <div className="visits-page-boxes-container">
          {" "}
          {currentPage === 1 && (
            <div className="visits-page-box">
              <button
                className="visits-page-add-button"
                onClick={() => {
                  setOpenedNewVisit(true);
                }}
              >
                <div className="schedule-text">Schedule a visit</div>
                <img src={plusIcon} alt="plus icon" className="plus-icon" />
              </button>
            </div>
          )}
          {visits
            .slice(checkNumberToSliceBegin(), checkNumberToSliceEnd())
            .map((visit) => {
              return (
                <div className="visits-page-box">
                  <VisitCard props={visit} />
                </div>
              );
            })}
        </div>
        <PaginationComponent
          maxPages={maxPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <Modal
          open={openedNewVisit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="add-visit-modal"
        >
          <div className="modal-container">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <div className="modal-form-container">
                <Form className="modal-form">
                  <div className="modal-form-inputs">
                    <h1 className="modal-form-title">Schedule a visit</h1>
                    <div className="several-fields-container">
                      <div className="form-control">
                        <label htmlFor="date">Date</label>
                        <Field
                          type="date"
                          id="date"
                          name="date"
                          className="modal-form-input input-field"
                        />
                        <ErrorMessage name="date" component={TextError} />
                      </div>
                      <div className="form-control">
                        <label htmlFor="time">Time</label>
                        <Field
                          type="time"
                          id="time"
                          min="09:00:00"
                          max="18:00:00"
                          step="3600"
                          name="time"
                          className="modal-form-input input-field"
                        />
                        <ErrorMessage name="time" component={TextError} />
                      </div>
                    </div>
                    <div className="form-control">
                      <label htmlFor="location">Location</label>
                      <Field
                        component="select"
                        defaultValue="10 Main Street, New York, NY 10001"
                        name="location"
                        id="location"
                        className="input-selector"
                      >
                        <option value="10 Main Street, New York, NY 10001">
                          10 Main Street, New York, NY 10001
                        </option>
                        <option value="15 Main Street, New York, NY 10001">
                          15 Main Street, New York, NY 10001
                        </option>
                      </Field>
                    </div>
                    <div className="form-control">
                      <label htmlFor="description">Purpose of the visit</label>
                      <Field
                        component="select"
                        className="input-selector"
                        name="description"
                        id="description"
                        defaultValue="Submission of documents"
                      >
                        <option value="Submission of documents">Visit</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Interview">Interview</option>
                      </Field>
                    </div>
                  </div>
                  <div className="buttons-container">
                    <button className="submit-button" type="submit">
                      Add
                    </button>
                    <button
                      className="cancel-button"
                      type="reset"
                      onClick={() => {
                        setOpenedNewVisit(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </Form>
              </div>
            </Formik>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default VisitsPage;
