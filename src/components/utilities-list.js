import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UtilityTableRow from './UtilityTableRow';
import {DropdownButton, Dropdown} from 'react-bootstrap';

import { connect } from "react-redux";
import classnames from "classnames";


class UtilitytList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            utilities: [],
            choice: '',
            cityChoice: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    componentDidMount() {
        this.fetchData();

    }

    getLocation() {
        axios.get("https://ipinfo.io?token=35797a9aa82ded")
            .then(res => {
                console.log(res.data.city);
                this.setState({
                    cityChoice: res.data.city
                })
            })

        //         this.setState({
        //     cityChoice: 'Gabrovo'
        // })
        setTimeout(function () { this.fetchData(); }.bind(this), 1200);

    }

    // getCoordinates(position) {
    //     console.log(position.coords.latitude);setTimeout(function() {

    //     console.log(position.coords.longitude);
    // }

    fetchData = () => {
        axios.get('http://localhost:4000/utility/')
            .then(res => {
                if (this.state.choice != '') {
                    console.log('purviq if');
                    if (this.state.choice === 'all') {
                        this.setState({
                            utilities: res.data
                        });
                        this.state.choice = '';
                    } else {
                        this.setState({
                            utilities: res.data.filter(item => item.category === this.state.choice)
                        });
                        this.state.choice = '';
                    }
                }
                else if (this.state.cityChoice != '') {
                    console.log('vtoriq if');
                    this.setState({
                        utilities: res.data.filter(item => item.town === this.state.cityChoice)
                    });
                    this.state.cityChoice = '';
                }
                else {
                    console.log('elsa');
                    this.setState({
                        utilities: res.data
                    });
                    // this.state.choice='';
                    // this.state.cityChoice = '';
                }
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

    handleInputChange(e) {
        this.setState({
            choice: e.target.value
        })

        this.fetchData();
    }

    render() {
        return (
            <>
                <div className="form-group">
                    <select name="category" onChange={this.handleInputChange}>
                        <option value="all">ALL</option>
                        <option value="animal services">Animal services</option>
                        <option value="babysitters">Babysitters</option>
                        <option value="car repair">Car repair</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="gardening services">Gardening services</option>
                        <option value="house repair">House repair</option>
                    </select>
                </div>
                <button onClick={this.getLocation}>get location</button>

                {/*<DropdownButton id="dropdown-item-button" name="category" title="Categories" onChange={this.handleInputChange}>*/}
                {/*    <Dropdown.Item as="button" value="all">All</Dropdown.Item>*/}
                {/*    <Dropdown.Item as="button" value="animal services">Animal services</Dropdown.Item>*/}
                {/*    <Dropdown.Item as="button">Something else</Dropdown.Item>*/}
                {/*</DropdownButton>*/}

                <div className="table-wrapper">

                    {/* <Table striped bordered hover> */}
                        {/* <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Phone</th>
                                <th>Town</th>
                            </tr>
                        </thead>
                        <tbody> */}
                            {this.DataTable()}
                        {/* </tbody> */}
                    {/* </Table> */}
                </div>
            </>);

    }
}


export default UtilitytList