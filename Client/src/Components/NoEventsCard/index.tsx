import "./index.scss";

import React from "react";

const NoEventsCard: React.FC = () => {
  return (
    <div className="events-to-see">
      <div className="events-to-see__message">
        <h2 className="events-to-see__title">You don't have any events yet</h2>
        <p className="events-to-see__description">
          Start creating events to see them here!
        </p>
      </div>
      <div className="events-to-see__image"></div>
    </div>
  );
};

export default NoEventsCard;
