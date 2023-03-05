import "./index.scss";

import DropdownDown from "../../../../Pictures/arrowDown.svg";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ResidencePermitDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Navigate = useNavigate();
  return (
    <div
      className="residence-permit-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="residence-permit-button-container dropdown-menu-button">
        <div className="residence-permit-button">
          Residence permit
          {isOpen ? (
            <img
              src={DropdownDown}
              className="arrow arrow-up"
              alt="Dropdown Down"
            />
          ) : (
            <img
              src={DropdownDown}
              className="arrow arrow-down"
              alt="Dropdown down"
            />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="residence-permit-menu">
          <button
            className="residence-permit-menu-item"
            onClick={() => {
              Navigate("/residence-permits");
            }}
          >
            My permit cases
          </button>

          <button
            className="residence-permit-menu-item"
            onClick={() => {
              Navigate("/residence-application");
            }}
          >
            Apply for permit
          </button>
          <button
            className="residence-permit-menu-item"
            onClick={() => {
              Navigate("/residence-info");
            }}
          >
            About Permits
          </button>
        </div>
      )}
    </div>
  );
};

export default ResidencePermitDropdown;
