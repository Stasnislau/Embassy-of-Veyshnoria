import "./index.scss";

import React, { useState } from "react";
import {
  VisaApplicationFrontInterface,
  VisaApplicationInterface,
} from "../../Interfaces";

import { Context } from "../..";
import Header from "../../Components/Header";
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
        store.isLoading = true;
        const response = await VisaService.fetchVisaApplicationsByUser();
        console.log(response.data);
        setVisas(response.data);
      } catch (error: any) {
        setErrorText(error.response.data.message);
      } finally {
        store.isLoading = false;
      }
    };
    fetchVisas();
  }, []);
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
    </div>
  );
};

export default VisasPage;
