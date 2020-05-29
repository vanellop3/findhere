import React, {Component} from "react";
import {connect} from "react-redux";
import classnames from "classnames";
import axios from "axios";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            firstName:'',
            lastName:'',
            phone:'',
            email: '',
            password: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        axios.get('http://localhost:4000/users/edit-profile/' + this.props.auth.user.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    firstName:res.data.firstName,
                    lastName:res.data.lastName,
                    email: res.data.email,
                    phone:res.data.phone
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        var user;
        if (this.state.password == '') {
            user = {
                username: this.state.username,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                phone:this.state.phone
            }
            console.log('no passssss');
        } else {
            user = {
                username: this.state.username,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                phone:this.state.phone,
                password: this.state.password
            }
        }
        axios.put('http://localhost:4000/users/update-profile/' + this.props.auth.user.id, user)
            .then((res) => {
                console.log(res.data)
                alert('Profile successfully updated')
            }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/')

    }


    render() {
        const {errors} = this.state;
        // console.log(this.state);
        return (
            <div className="container">
                <h2 style={{marginBottom: '40px'}}>Profile edit</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="username"
                            className={'form-control form-control-lg'}
                            name="username"
                            onChange={this.handleInputChange}
                            value={this.state.username}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="first name"
                            className={'form-control form-control-lg'}
                            name="firstName"
                            onChange={this.handleInputChange}
                            value={this.state.firstName}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="last name"
                            className={'form-control form-control-lg'}
                            name="lastName"
                            onChange={this.handleInputChange}
                            value={this.state.lastName}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className={'form-control form-control-lg'}
                            name="email"
                            value={this.state.email}
                            disabled="disabled"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="phone"
                            placeholder="phone"
                            className={'form-control form-control-lg'}
                            name="phone"
                            value={this.state.phone}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className={'form-control form-control-lg'}
                            name="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn--primary">
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(EditProfile);