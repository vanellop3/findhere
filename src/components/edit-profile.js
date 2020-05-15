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
            }
        } else {
            user = {
                name: this.state.name,
                password: this.state.password,
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
        console.log(this.state);
        return (
            <div className="container">
                <h2 style={{marginBottom: '40px'}}>Profile edit</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            className={'form-control form-control-lg'}
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
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