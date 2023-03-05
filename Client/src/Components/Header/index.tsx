import "./index.scss";

import DropdownAccountMenu from "./Components/DropdownAccountMenu";
import MinistryLogo from "./../../Pictures/ministryLogo.png";
import React from "react";
import ResidencePermitDropdown from "./Components/ResidencePermitDropdown";
import VisaDropdownMenu from "./Components/VisaDropdown";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const Navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-container">
        <div className="left-container">
          <button className="header-button" onClick={() => Navigate("/dashboard")}>
            <img
              src={MinistryLogo}
              className="ministry-logo"
              alt="Ministry Logo"
            />
          </button>
          <b className="ministry-text">
            Ministry of foreign affairs of Veyshnoria
          </b>
        </div>
        <div className="right-container">
          <DropdownAccountMenu />
          <ResidencePermitDropdown />
          <VisaDropdownMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
