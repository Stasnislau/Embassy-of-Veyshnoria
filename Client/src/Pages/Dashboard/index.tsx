import "./index.scss";

import {
  ResidencePermitApplicationInterface,
  VisaApplicationInterface,
  VisitInterface,
} from "../../Interfaces";

import { Context } from "../../index";
import ErrorModal from "../../Components/ErrorModal";
import Header from "../../Components/Header";
import NoEventsCard from "../../Components/NoEventsCard";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [visits, setVisits] = useState<VisitInterface[]>(
    [] as VisitInterface[]
  );
  const [visa, setVisa] = useState<VisaApplicationInterface>();
  const [permit, setPermit] = useState<ResidencePermitApplicationInterface>();

  const [errorText, setErrorText] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await VisitService.fetchVisitsByUser();
        setVisits(response.data);
      } catch (error: any) {
        return;
      }
      try {
        const response = await VisaService.fetchVisaApplicationsByUser();
        response.data.forEach((visa: VisaApplicationInterface) => {
          if (visa.status !== "Approved" && visa.status !== "Rejected") {
            setVisa(visa);
          }
        });
      } catch (error: any) {
        return null;
      }

      try {
        const response = await PermitService.fetchPermitApplicationsByUser();
        response.data.forEach((permit: ResidencePermitApplicationInterface) => {
          if (permit.status !== "Approved" && permit.status !== "Rejected") {
            setPermit(permit);
          }
        });
      } catch (error: any) {
        return null;
      }
    })();
  }, [store.isAuthorized]);
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

  const hasEvents = visits.length > 0 || visa || permit;
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-body">
        {hasEvents ? (
          <div className="dashboard-boxes-container">
            {visa && currentPage === 1 ? (
              <div className="dashboard-box dashboard-box-highlight">
                <VisaCard
                  props={{
                    id: visa.id,
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
                    id: permit.id,
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
                    <VisitCard
                      props={{
                        id: visit.id,
                        date: visit.date,
                        time: visit.time,
                        location: visit.location,
                        description: visit.description,
                      }}
                    />
                  </div>
                );
              })}
          </div>
        ) : (
          <NoEventsCard />
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
