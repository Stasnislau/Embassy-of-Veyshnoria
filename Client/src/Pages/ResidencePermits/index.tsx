import "./index.scss";

import React, { useState } from "react";

import Header from "../../Components/Header";
import PaginationComponent from "../../Components/Pagination";
import ResidencePermitCard from "../../Components/EventCards/PermitCard";

interface ResidencePermitProps {
  id: number;
  dateOfSubmission: string;
  dateOfDecision: string;
  status: string;
  description: string;
}

const ResidencePermitsPage = () => {
  const residencePermits: ResidencePermitProps[] = [
    {
      id: 1,
      dateOfSubmission: "2020-12-12",
      dateOfDecision: "2020-12-12",
      status: "Pending",
      description: "Description",
    },
    {
      id: 2,
      dateOfSubmission: "2020-12-12",
      dateOfDecision: "2020-12-12",
      status: "Rejected",
      description: "Description",
    },
    {
      id: 3,
      dateOfSubmission: "2020-12-12",
      dateOfDecision: "2020-12-12",
      status: "Approved",
      description: "Description",
    },
  ];
  const maxPages = Math.ceil(residencePermits.length / 6);

  const [currentPage, setCurrentPage] = useState(1);

  const checkNumberToSliceBegin = () => {
    if (currentPage === 1) return 0;
    else return (currentPage - 1) * 6 - 1;
  };
  const checkNumberToSliceEnd = () => {
    return currentPage * 6 - 1;
  };
  return (
    <div className="residence-permits-page-container">
      <Header />
      <div className="residence-permits-page-body">
        <div className="residence-permits-page-boxes-container">
          {residencePermits
            .slice(checkNumberToSliceBegin(), checkNumberToSliceEnd())
            .map((residencePermit) => {
              return (
                <div className="residence-permits-page-box">
                  <ResidencePermitCard props={residencePermit} />
                </div>
              );
            })}
        </div>
        <PaginationComponent
          maxPages={maxPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ResidencePermitsPage;
