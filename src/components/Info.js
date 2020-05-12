import React from "react";
import {Link} from "react-router-dom";
import classnames from "classnames";

const Info = (props) => {

    return (<div className={classnames('info', {'dark': props.className})}>
        <h2>{props.title}</h2>
        <h3>{props.description}</h3>
        {props.button ? <Link className="btn--special" to="/register">{props.button}</Link> : ''}
    </div>);
}

export default Info;