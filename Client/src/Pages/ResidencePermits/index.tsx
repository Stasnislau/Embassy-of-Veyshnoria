import "./index.scss";

import ErrorModal from "../../Components/ErrorModal";
import Header from "../../Components/Header";
import LoadingComponent from "../../Components/LoadingComponent";
import NoEventsCard from "../../Components/NoEventsCard";
import PaginationComponent from "../../Components/Pagination";
import PermitService from "../../Services/residence.service";
import React from "react";
import { ResidencePermitApplicationInterface } from "../../Interfaces";
import ResidencePermitCard from "../../Components/EventCards/PermitCard";
import { useEffect } from "react";
import { useState } from "react";

const ResidencePermitsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [residencePermits, setResidencePermits] = useState<
    ResidencePermitApplicationInterface[]
  >([]);

  const [errorText, setErrorText] = useState<string | null>(null);
  const maxPages = Math.ceil(residencePermits.length / 6);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await PermitService.fetchPermitApplicationsByUser();
        setResidencePermits(response.data);
      } catch (error: any) {
        return;
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
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
      {residencePermits.length > 0 ? (
        <div className="residence-permits-page-body">
          <div className="residence-permits-page-boxes-container">
            {residencePermits.length > 0 &&
              residencePermits
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
      ) : (
        <NoEventsCard />
      )}

      {errorText && (
        <ErrorModal
          message={errorText}
          open={errorText ? true : false}
          handleOkay={() => setErrorText(null)}
        />
      )}

      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default ResidencePermitsPage;
