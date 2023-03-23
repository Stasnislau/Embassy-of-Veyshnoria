import "./index.scss";

import React, { useState } from "react";
import {
  VisaApplicationFrontInterface,
  VisaApplicationInterface,
} from "../../Interfaces";

import { Context } from "../..";
import ErrorModal from "../../Components/ErrorModal";
import Header from "../../Components/Header";
import NoEventsCard from "../../Components/NoEventsCard";
import PaginationComponent from "../../Components/Pagination";
import VisaCard from "../../Components/EventCards/VisaCard";
import VisaService from "../../Services/visa.service";
import { useEffect } from "react";

const VisasPage = () => {
  const [visas, setVisas] = useState<VisaApplicationInterface[]>([]);
  const [errorText, setErrorText] = useState<string | null>(null);
  const { store } = React.useContext(Context);

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const response = await VisaService.fetchVisaApplicationsByUser();
        setVisas(response.data);
      } catch (error: any) {
        setErrorText(error.response.data.message);
      } 
    };
    fetchVisas();
  }, [store]);
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
      {visas.length > 0 ? (
        <div className="visas-page-body">
          <div className="visas-page-boxes-container">
            {visas
              .slice(checkNumberToSliceBegin(), checkNumberToSliceEnd())
              .map((visa) => {
                return (
                  <div className="visas-page-box">
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
          handleOkay={() => {
            setErrorText(null);
          }}
        />
      )}
    </div>
  );
};

export default VisasPage;
