import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class StudentTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent() {
        axios.delete('http://localhost:4000/utility/delete-utility/' + this.props.obj._id)
            .then((res) => {
                console.log('Utility successfully deleted!')
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.title}</td>
                <td>{this.props.obj.category}</td>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.price}</td>
                <td>{this.props.obj.phone}</td>
                <td>
                    <Link className="edit-link" to={"/edit-utility/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteStudent} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}