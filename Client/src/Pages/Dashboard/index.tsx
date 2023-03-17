import "./index.scss";

import {
  ResidencePermitApplicationsInterface,
  VisaApplicationInterface,
  visitInterface,
} from "../../Interfaces";

import { Context } from "../../index";
import ErrorModal from "../../Components/ErrorModal";
import Header from "../../Components/Header";
import PaginationComponent from "../../Components/Pagination";
import PermitService from "../../Services/residence.service";
import React from "react";
import ResidencePermitCard from "../../Components/EventCards/PermitCard";
import VisaCard from "../../Components/EventCards/VisaCard";
import VisaService from "../../Services/visa.service";
import VisitCard from "../../Components/EventCards/VisitCard";
import VisitService from "../../Services/visit.service";
import { useEffect } from "react";
import { useState } from "react";

const Dashboard = () => {
  const { store } = React.useContext(Context);
  const user = store.user;
  const [currentPage, setCurrentPage] = useState(1);
  const [visits, setVisits] = useState<visitInterface[]>([]);
  const [visa, setVisa] = useState<VisaApplicationInterface | null>(null);
  const [permit, setPermit] =
    useState<ResidencePermitApplicationsInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (store.isAuthorized) {
      try {
        VisitService.fetchVisitsByUser().then((response: any) => {
          setVisits(response.data.visits);
          setIsLoading(false);
        });
      } catch (error: any) {
        setErrorText(error.message);
      }
    }
    try {
      VisaService.fetchVisaApplicationsByUser().then((response: any) => {
        response.data.visaApplications.forEach((visa: any) => {
          if (visa.status === "Approved" || visa.status === "Rejected") {
            setVisa(visa);
          }
        });
        setIsLoading(false);
      });
    } catch (error: any) {
      setErrorText(error.message);
    }
    try {
      PermitService.fetchPermitApplicationsByUser().then((response: any) => {
        response.data.residencePermitApplications.forEach((permit: any) => {
          if (permit.status === "Approved" || permit.status === "Rejected") {
            setPermit(permit);
          }
        });
        setIsLoading(false);
      });
    } catch (error: any) {
      setErrorText(error.message);
    }
  }, [user, store.isAuthorized]);
  const maxPages =
    (visits.length + (visa || permit ? 1 : 0)) % 6 === 0
      ? (visits.length + (visa || permit ? 1 : 0)) / 6
      : Math.ceil((visits.length + (visa || permit ? 1 : 0)) / 6);
  const checkNumberToSliceBegin = () => {
    if (visa || permit)
      if (currentPage === 1) {
        return 0;
      } else {
        return (currentPage - 1) * 6 - 1;
      }
    else if (currentPage === 1) {
      return 0;
    } else {
      return (currentPage - 1) * 6;
    }
  };
  const checkNumberToSliceEnd = () => {
    if (visa || permit)
      if (currentPage === 1) {
        return 5;
      } else {
        return currentPage * 6 - 1;
      }
    else if (currentPage === 1) {
      return 6;
    } else {
      return currentPage * 6;
    }
  };

  const hasEvents = visits.length > 0 || !visa || !permit;

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-body">
          
          <div className="dashboard-boxes-container">
          {visa && currentPage === 1 ? (
            <div className="dashboard-box dashboard-box-highlight">
              <VisaCard
                props={{
                  dateOfSubmission: visa.dateOfSubmission,
                  dateOfDecision: visa.dateOfDecision,
                  status: visa.status,
                  description: visa.description,
                }}
              />
            </div>
          ) : permit && currentPage === 1 ? (
            <div className="dashboard-box dashboard-box-highlight">
              <ResidencePermitCard
                props={{
                  dateOfSubmission: permit.dateOfSubmission,
                  dateOfDecision: permit.dateOfDecision,
                  status: permit.status,
                  description: permit.description,
                }}
              />
            </div>
          ) : null}
          {visits
            .slice(checkNumberToSliceBegin(), checkNumberToSliceEnd())
            .map((visit) => {
              return (
                <div className="dashboard-box">
                  <VisitCard props={visit} />
                </div>
              );
            })}
        </div>

        {!hasEvents && (
          <div className="dashboard-no-events">
            <h1>You have no events</h1>
          </div>
        )}
        
        <PaginationComponent
          maxPages={maxPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {errorText && (
        <ErrorModal
          message={errorText}
          handleOkay={() => setErrorText(null)}
          open={errorText ? true : false}
        />
      )}
    </div>
  );
};

export default Dashboard;
