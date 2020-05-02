import React from "react";

const Info = (props) => {

  return (<div className="info">
    <h2>{props.title}</h2>
    <h3>{props.description}</h3>
  </div>);
}

export default Info;