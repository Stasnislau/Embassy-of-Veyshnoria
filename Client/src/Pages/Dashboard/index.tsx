import "./index.scss";

import Header from "../../Components/Header";
import PaginationComponent from "../../Components/Pagination";
import React from "react";
import VisaCard from "../../Components/EventCards/VisaCard";
import VisitCard from "../../Components/EventCards/VisitCard";
import { useState } from "react";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const visits = [
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
      location: "10 Main Street, New York, NY 10001",
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
      location: "10 Main Street, New York, NY 10001",
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
      location: "10 Main Street, New York, NY 10001",
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
      location: "10 Main Street, New York, NY 10001",
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
      location: "10 Main Street, New York, NY 10001",
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
      location: "10 Main Street, New York, NY 10001",
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
      location: "10 Main Street, New York, NY 10001",
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
      location: "10 Main Street, New York, NY 10001",
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
      location: "10 Main Street, New York, NY 10001",
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
      location: "10 Main Street, New York, NY 10001",
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
      location: "10 Main Street, New York, NY 10001",
      description: "Visit to submit new documents",
    },
  ];
  const visa = {
    dateOfSubmission: "2020-12-12",
    dateOfDecision: "2020-12-12",
    status: "Pending",
    description: "",
  };
  const maxPages =
    (visits.length + (visa.status ? 1 : 0)) % 6 === 0
      ? (visits.length + (visa.status ? 1 : 0)) / 6
      : Math.ceil((visits.length + (visa.status ? 1 : 0)) / 6);
  const checkNumberToSliceBegin = () => {
    if (visa.status)
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
    if (visa.status)
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

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-body">
        <div className="dashboard-boxes-container">
          {visa.status && currentPage === 1 ? (
            <div className="dashboard-box dashboard-box-highlight">
              <VisaCard props={visa} />
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
        <PaginationComponent
          maxPages={maxPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
