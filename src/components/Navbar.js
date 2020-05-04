import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authentication';
import {withRouter} from 'react-router-dom';
import {Nav} from "react-bootstrap";
import {Navbar} from "react-bootstrap";

class Navigation extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <Nav className="mr-auto">
                {this.props.auth.user.isAdmin ?
                    <Nav.Link href="/my-utilities">All utilities</Nav.Link>
                    : <Nav.Link href="/my-utilities">My utilities</Nav.Link>
                } <Nav.Link href="/create-utility">Add utility</Nav.Link>
                <Nav.Link href={"/edit-profile/" + this.props.auth.user.id}>My Profile</Nav.Link>


                <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                         className="rounded-circle"
                         style={{width: '25px', marginRight: '5px'}}/>
                    Logout
                </a>
            </Nav>
        )
        const guestLinks = (
            <Nav className="mr-auto">
                <Nav.Link href="/register">Sign Up</Nav.Link>
                <Nav.Link href="/login">Sign In</Nav.Link>
            </Nav>
        )
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">FindHere</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {isAuthenticated ? authLinks : guestLinks}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(withRouter(Navigation));