import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            firstName:'',
            lastName:'',
            phone:'',
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

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            phone:this.state.phone,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        console.log(this.state);
        return(
            <div className="container">
                <h2 style={{marginBottom: '40px'}}>Registration</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.username
                            })}
                            name="username"
                            onChange={ this.handleInputChange }
                            value={ this.state.username }
                        />
                        {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="first name"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.firstName
                            })}
                            name="firstName"
                            onChange={ this.handleInputChange }
                            value={ this.state.firstName }
                        />
                        {errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="last name"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.lastName
                            })}
                            name="lastName"
                            onChange={ this.handleInputChange }
                            value={ this.state.lastName }
                        />
                        {errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            onChange={ this.handleInputChange }
                            value={ this.state.email }
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
                            onChange={ this.handleInputChange }
                            value={ this.state.password }
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password_confirm
                            })}
                            name="password_confirm"
                            onChange={ this.handleInputChange }
                            value={ this.state.password_confirm }
                        />
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="phone"
                            placeholder="Phone"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.phone
                            })}
                            name="phone"
                            onChange={this.handleInputChange}
                            value={this.state.phone}
                        />
                        {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn--primary">
                            Register User
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))