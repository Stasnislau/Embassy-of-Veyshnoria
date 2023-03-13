import "./index.scss";

import React from "react";

interface ErrorMenuProps {
  message: string;
}

const ErrorMenu: React.FC<ErrorMenuProps> = ({ message }) => {
  return (
    <div className="error-menu">
      <span>{message}</span>
    </div>
  );
};

export default ErrorMenu;