import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UtilityTableRow from './UtilityTableRow';


export default class UtilitytList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            utilities: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/utility/')
            .then(res => {
                this.setState({
                    utilities: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    DataTable() {
        return this.state.utilities.map((res, i) => {
            return <UtilityTableRow obj={res} key={i} />;
        });
    }


    render() {
        return (<div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {this.DataTable()}
                </tbody>
            </Table>
        </div>);
    }
}