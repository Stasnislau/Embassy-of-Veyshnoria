import "./index.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { VisitFrontInterface, VisitInterface } from "../../Interfaces";

import ErrorModal from "../../Components/ErrorModal";
import Header from "../../Components/Header";
import LoadingComponent from "../../Components/LoadingComponent";
import Modal from "@mui/material/Modal";
import PaginationComponent from "../../Components/Pagination";
import TextError from "../../Components/TextError";
import VisitCard from "../../Components/EventCards/VisitCard";
import VisitService from "../../Services/visit.service";
import moment from "moment";
import plusIcon from "../../Pictures/plus.svg";

const VisitsPage = () => {
  const [visits, setVisits] = useState<VisitInterface[]>([]);
  const [maxPages, setMaxPages] = useState(Math.ceil(visits.length / 6));
  const [currentPage, setCurrentPage] = useState(1);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [openedNewVisit, setOpenedNewVisit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setMaxPages(Math.ceil(visits.length / 6));
  }, [visits.length, openedNewVisit]);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await VisitService.fetchVisitsByUser();
        setVisits(response.data);
        setMaxPages(Math.ceil(visits.length / 6));
      } catch (error: any) {
        return;
      } finally {
        setIsLoading(false);
      }
    })();
  }, [visits.length, openedNewVisit]);
  const validationSchema = Yup.object().shape({
    date: Yup.string()
      .test(
        "is-valid-date",
        "Invalid date, format: DD.MM",
        (value) =>
          moment(value, "DD.MM").isValid() &&
          moment(value, "DD.MM").isAfter(moment().subtract(1, "days")) &&
          moment(value, "DD.MM").isoWeekday() !== 6 &&
          moment(value, "DD.MM").isoWeekday() !== 7
      )
      .required("Required"),
    time: Yup.string()
      .test(
        "is-valid-time",
        "Between 09:00 and 18:00",
        (value) =>
          moment(value, "HH:mm").isValid() &&
          moment(value, "HH:mm").isBetween(
            moment("09:00", "HH:mm"),
            moment("18:00", "HH:mm")
          )
      )
      .required("Required"),
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
    location: "",
    description: "",
  };
  const onSubmit = (values: VisitFrontInterface) => {
    (async () => {
      try {
        values.date = moment(values.date, "DD.MM").format("DD.MM.YYYY");
        await VisitService.createVisit(values);
        setOpenedNewVisit(false);
      } catch (error: any) {
        setErrorText(error.response.data.message);
        setOpenedNewVisit(false);
      }
    })();
  };

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
                          type="text"
                          id="date"
                          name="date"
                          placeholder="dd.mm"
                          className="modal-form-input input-field"
                        />
                        <ErrorMessage name="date" component={TextError} />
                      </div>
                      <div className="form-control">
                        <label htmlFor="time">Time</label>
                        <Field
                          placeholder="hh:mm"
                          type="text"
                          id="time"
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
                        name="location"
                        id="location"
                        className="input-selector"
                      >
                        <option value="">Please select</option>

                        <option value="Belusha street, 10, Harodnia, Veyshnoria">
                          Belusha street, 10, Harodnia, Veyshnoria
                        </option>
                        <option value="Yanki Kupaly street, , Harodnia, Veyshnoria">
                          Yanki Kupaly street, 53, Harodnia, Veyshnoria
                        </option>
                        <option value="Zamkovaia street , 22 , Harodnia, Veyshnoria">
                          Zamkovaia street, 22, Harodnia, Veyshnoria
                        </option>
                      </Field>
                      <ErrorMessage name="location" component={TextError} />
                    </div>
                    <div className="form-control">
                      <label htmlFor="description">Purpose of the visit</label>
                      <Field
                        component="select"
                        className="input-selector"
                        name="description"
                        id="description"
                      >
                        <option value="">Please select</option>
                        <option value="Submission of documents">Visit</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Interview">Interview</option>
                      </Field>
                      <ErrorMessage name="description" component={TextError} />
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
      {errorText && (
        <ErrorModal
          message={errorText}
          open={errorText ? true : false}
          handleOkay={() => setErrorText(null)}
        />
      )}

      { isLoading && <LoadingComponent />}
    </div>
  );
};

export default VisitsPage;
