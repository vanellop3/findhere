import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {connect} from "react-redux";

class StudentTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent() {
        axios.delete('http://localhost:4000/utility/delete-utility/' + this.props.obj._id)
            .then((res) => {
                alert('successfully deleted');
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        console.log(this.props.user);
        const isAdmin = this.props.auth.user.isAdmin;
        const logged = this.props.auth.user.id;
        if (isAdmin === true || logged === this.props.obj.creatorId) {
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
        } else {
            return (
                <tr>
                    <td>{this.props.obj.title}</td>
                    <td>{this.props.obj.category}</td>
                    <td>{this.props.obj.description}</td>
                    <td>{this.props.obj.price}</td>
                    <td>{this.props.obj.phone}</td>
                    {/*<td>*/}
                    {/*    <Link className="edit-link" to={"/edit-utility/" + this.props.obj._id}>*/}
                    {/*        Edit*/}
                    {/*    </Link>*/}
                    {/*    <Button onClick={this.deleteStudent} size="sm" variant="danger">Delete</Button>*/}
                    {/*</td>*/}
                </tr>
            );
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(StudentTableRow);