import React from "react";
import "./index.scss";
const TextError = (props: any) => {
  return <div className="error">{props.children}</div>;
};
export default TextError;