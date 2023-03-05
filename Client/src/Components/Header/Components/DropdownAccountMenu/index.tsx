import "./index.scss";

import React, { useState } from "react";

import AccountIcon from "../../../../Pictures/accountIcon.svg";
import DropdownDown from "../../../../Pictures/arrowDown.svg";
import { useNavigate } from "react-router-dom";

const DropdownAccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="dropdown-account-button-container dropdown-menu-button"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="trigger-button-container">
        <img src={AccountIcon} className="account-logo" alt="Account Logo" />
        <div className="dropdown-account-button">
          {isOpen ? (
            <img
              src={DropdownDown}
              className="arrow arrow-up"
              alt="Dropdown Up"
            />
          ) : (
            <img
              src={DropdownDown}
              className="arrow arrow-down"
              alt="Dropdown Down"
            />
          )}
        </div>

        {isOpen && (
          <div className="dropdown-account-menu">
            <button
              className="dropdown-account-menu-item"
              onClick={() => {
                navigate("/account");
              }}
            >
              Your information
            </button>
            <button
              className="dropdown-account-menu-item"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Your cases
            </button>
            <button
              className="dropdown-account-menu-item"
              onClick={() => {
                navigate("/visits");
              }}
            >
              Visit management
            </button>
            <button
              className="dropdown-account-menu-item"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownAccountMenu;
