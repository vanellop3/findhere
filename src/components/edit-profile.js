import React, {Component} from "react";
import {connect} from "react-redux";
import classnames from "classnames";
import axios from "axios";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
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
                    name: res.data.name,
                    email: res.data.email
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        var user;
        if (this.state.password === '') {
            user = {
                name: this.state.name,
                email: this.state.email,
            }
        } else {
            user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            }
        }
        axios.put('http://localhost:4000/users/update-profile/' + this.props.auth.user.id, user)
            .then((res) => {
                console.log(res.data)
                console.log('Profile successfully updated')
            }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/')

    }


    render() {
        const {errors} = this.state;
        console.log(this.state);
        return (
            <div className="container" style={{marginTop: '50px', width: '700px'}}>
                <h2 style={{marginBottom: '40px'}}>Profile edit</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.name
                            })}
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            onChange={this.handleInputChange}
                            value={this.state.email}
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
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