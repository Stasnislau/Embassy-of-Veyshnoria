import "./index.scss";

import React from "react";

const NoEventsCard = () => {
  return (
    <div className="no-events-card">
      <h1 className="no-events-text">You have no events {':('}</h1>
      <h1 className="no-events-text">
        You should add something to be able to see it here
      </h1>
    </div>
  );
};

export default NoEventsCard;
