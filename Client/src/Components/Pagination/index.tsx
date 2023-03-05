import "./index.scss";

import React, { useEffect, useState } from "react";

type PaginationProps = {
  maxPages: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};

const PaginationComponent = ({
  maxPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const [pagesToDisplay, setPagesToDisplay] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const getTemplate = (index: number) => {
      return (
        <button
          key={index}
          className={
            index === currentPage
              ? "pagination-item active-pagination-item"
              : "pagination-item"
          }
          onClick={() => {
            setCurrentPage(index);
          }}
        >
          {index}
        </button>
      );
    };

    const temp: JSX.Element[] = [];

    if (maxPages <= 5) {
      for (let i = 1; i <= maxPages; i++) {
        temp.push(getTemplate(i));
      }
    } else {
      if (currentPage > 2) {
        temp.push(getTemplate(1));
        if (currentPage > 3) {
          temp.push(
            <div key="first" className="pagination-item-corner">
              ...
            </div>
          );
        }
      }
      if (currentPage === maxPages) {
        temp.push(getTemplate(maxPages - 3));
        temp.push(getTemplate(maxPages - 2));
      }
      if (currentPage === maxPages - 1) {
        temp.push(getTemplate(maxPages - 3));
      }
      for (
        let i = Math.max(currentPage - 1, 1);
        i <= Math.min(currentPage + 1, maxPages);
        i++
      ) {
        temp.push(getTemplate(i));
      }
      if (currentPage === 1) {
        temp.push(getTemplate(3));
        temp.push(getTemplate(4));
      }
      if (currentPage === 2) {
        temp.push(getTemplate(4));
      }

      if (currentPage < maxPages - 1) {
        if (currentPage < maxPages - 2) {
          temp.push(
            <div key="last" className="pagination-item-corner">
              ...
            </div>
          );
        }
        temp.push(getTemplate(maxPages));
      }
    }

    setPagesToDisplay(temp);
  }, [maxPages, currentPage, setCurrentPage]);

  return (
    <div className="pagination-container">
      {pagesToDisplay.map((page) => page)}
    </div>
  );
};

export default PaginationComponent;
