import "./index.scss";

import React, { useState } from "react";

import Header from "../../Components/Header";
import PaginationComponent from "../../Components/Pagination";
import VisaCard from "../../Components/EventCards/VisaCard";

interface VisaProps {
  id: number;
  dateOfSubmission: string;
  dateOfDecision: string;
  status: string;
  description: string;
}

const VisasPage = () => {
  const visas: VisaProps[] = [
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
  const maxPages = Math.ceil(visas.length / 6);

  const [currentPage, setCurrentPage] = useState(1);

  const checkNumberToSliceBegin = () => {
    if (currentPage === 1) return 0;
    else return (currentPage - 1) * 6 - 1;
  };
  const checkNumberToSliceEnd = () => {
    return currentPage * 6 - 1;
  };
  return (
    <div className="visas-page-container">
      <Header />
      <div className="visas-page-body">
        <div className="visas-page-boxes-container">
          {visas
            .slice(checkNumberToSliceBegin(), checkNumberToSliceEnd())
            .map((visa) => {
              return (
                <div className="visas-page-box">
                  <VisaCard
                    props={{
                      dateOfSubmission: visa.dateOfSubmission,
                      dateOfDecision: visa.dateOfDecision,
                      status: visa.status,
                      description: visa.description,
                    }}
                  />
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

export default VisasPage;
