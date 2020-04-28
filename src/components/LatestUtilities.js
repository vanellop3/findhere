import React, {Component, useEffect, useState} from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UtilityTableRow from './UtilityTableRow';
import {connect} from "react-redux";
import {getMyUtility} from "../actions/utility";
import {withRouter} from "react-router-dom";


const UserUtilities = (props) => {
    const [utilities, setUtility] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/utility/')
            .then(res => {
              var arr = res.data.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                arr = arr.slice(0,3);
                setUtility(arr);
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])

    const DataTable = () => {
        return utilities.map((res, i) => {
            return <UtilityTableRow obj={res} key={i}/>;
        });
    }


    return (<div className="table-wrapper">
        <Table striped bordered hover>
            <thead>
            <tr>
                <th> Latest Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Phone</th>
            </tr>
            </thead>
            <tbody>
            {DataTable()}
            </tbody>
        </Table>
    </div>);
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(UserUtilities);