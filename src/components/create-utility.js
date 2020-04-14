import React, {Component} from "react";
import classnames from 'classnames';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addUtility} from '../actions/utility';
import {withRouter} from "react-router-dom";

class CreateUtility extends Component {

    constructor(props) {
        super()

        // Setting up functions
        this.onChangeUtilityTitle = this.onChangeUtilityTitle.bind(this);
        this.onChangeUtilityCategory = this.onChangeUtilityCategory.bind(this);
        this.onChangeUtilityDescription = this.onChangeUtilityDescription.bind(this);
        this.onChangeUtilityPrice = this.onChangeUtilityPrice.bind(this);
        this.onChangeUtilityPhone = this.onChangeUtilityPhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            title: '',
            category: '',
            description: '',
            price: '',
            creatorId: '',
            phone: '',
            errors: {}
        }
    }

    onChangeUtilityTitle(e) {
        this.setState({title: e.target.value})
    }

    onChangeUtilityDescription(e) {
        this.setState({description: e.target.value})
    }

    onChangeUtilityPrice(e) {
        this.setState({price: e.target.value})
    }

    onChangeUtilityCategory(e) {
        this.setState({category: e.target.value})
    }

    onChangeUtilityPhone(e) {
        this.setState({phone: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        const utilityObject = {
            title: this.state.title,
            category: this.state.category,
            description: this.state.description,
            price: this.state.price,
            creatorId: this.props.auth.user.id,
            phone: this.state.phone

        };
        this.props.addUtility(utilityObject, this.props.history);

        this.setState({title: '', category: '', description: '', price: '', creatorId: '', phone: ''})
    }

    componentDidMount() {
        console.log(this.props);
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        } else {
            this.props.history.push('/utility-list');
        }
    }

    render() {
        const {errors} = this.state;
        console.log(this.state);
        return (<div className="form-wrapper">
            <div className="container" style={{marginTop: '50px', width: '700px'}}>
                <h2 style={{marginBottom: '40px'}}>Add utility</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Title"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.title
                            })}
                            name="title"
                            onChange={this.onChangeUtilityTitle}
                            value={this.state.title}
                        />
                        {errors.title && (<div className="invalid-feedback">{errors.title}</div>)}
                    </div>
                    <div className="form-group">
                        <select id="category" onChange={this.onChangeUtilityCategory}
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.category
                                })}>
                            <option disabled selected>Choose category</option>
                            <option value="animal services">Animal services</option>
                            <option value="babysitters">Babysitters</option>
                            <option value="car repair">Car repair</option>
                            <option value="cleaning">Cleaning</option>
                            <option value="gardening services">Gardening services</option>
                            <option value="house repair">House repair</option>
                        </select>
                        {errors.category && (<div className="invalid-feedback">{errors.category}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Description"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.description
                            })}
                            name="category"
                            onChange={this.onChangeUtilityDescription}
                            value={this.state.description}
                        />
                        {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Price"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.price
                            })}
                            name="category"
                            onChange={this.onChangeUtilityPrice}
                            value={this.state.price}
                        />
                        {errors.price && (<div className="invalid-feedback">{errors.price}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Phone"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.phone
                            })}
                            name="phone"
                            onChange={this.onChangeUtilityPhone}
                            value={this.state.phone}
                        />
                        {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            ADD Utility
                        </button>
                    </div>
                </form>
            </div>
        </div>);
    }
}

CreateUtility.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {addUtility})(withRouter(CreateUtility))