import React, {Component} from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UtilityTableRow from './UtilityTableRow';
import {connect} from "react-redux";
import {getMyUtility} from "../actions/utility";
import {withRouter} from "react-router-dom";


class UserUtilities extends Component {

    constructor(props) {
        super(props)
        this.state = {
            utilities: []
        };
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('http://localhost:4000/utility/')
            .then(res => {
                this.setState({
                    utilities: res.data.filter(utility=>utility.creatorId === this.props.auth.user.id)
                });
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

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(UserUtilities);