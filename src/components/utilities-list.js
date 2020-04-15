import React, {Component} from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UtilityTableRow from './UtilityTableRow';
import {connect} from "react-redux";
import classnames from "classnames";


class UtilitytList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            utilities: [],
            choice: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios.get('http://localhost:4000/utility/')
            .then(res => {
                if (this.state.choice != '') {
                    if (this.state.choice === 'all') {
                        this.setState({
                            utilities: res.data
                        });
                    } else {
                        console.log('choice');
                        this.setState({
                            utilities: res.data.filter(item => item.category === this.state.choice)
                        });
                    }
                } else {
                    console.log('nqma choice');
                    this.setState({
                        utilities: res.data
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    DataTable() {
        return this.state.utilities.map((res, i) => {
            return <UtilityTableRow obj={res} key={i}/>;
        });
    }

    handleInputChange(e) {
        this.setState({
            choice: e.target.value
        })

        this.fetchData();
    }

    render() {
        console.log(this.state.choice);
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
                <div className="table-wrapper">

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Phone</th>
                            <th>Town</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.DataTable()}
                        </tbody>
                    </Table>
                </div>
            </>);

    }
}


export default UtilitytList