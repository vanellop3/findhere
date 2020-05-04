import React from "react";
import {Link} from "react-router-dom";

const Info = (props) => {

  return (<div className="info">
    <h2>{props.title}</h2>
    <h3>{props.description}</h3>
    {props.button ? <Link className="btn--special" to="/register">Register</Link> : ''}
  </div>);
}

export default Info;