import React, { Component } from "react";
import classnames from 'classnames';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUtility } from '../actions/utility';
import { withRouter } from "react-router-dom";
import TownList from '../components/TownList';
import CategoryList from '../components/CategoryList';

class CreateUtility extends Component {

    constructor(props) {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            title: '',
            category: '',
            description: '',
            price: '',
            creatorId: '',
            town: '',
            phone: '',
            errors: {}
        }
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log([e.target.name] + " : " + e.target.value);
    }

    onSubmit(e) {
        e.preventDefault()

        const utilityObject = {
            title: this.state.title,
            category: this.state.category,
            description: this.state.description,
            price: this.state.price,
            town: this.state.town,
            townLng: this.state.townLng,
            townLat: this.state.townLat,
            creatorId: this.props.auth.user.id,
            phone: this.state.phone

        };
        this.props.addUtility(utilityObject, this.props.history);
        console.log(utilityObject);
        this.setState({ title: '', category: '', description: '', price: '', creatorId: '', town: '', townLng: '', townLat: '', phone: '' })
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errorscontainer
            });
        } else {
            this.props.history.push('/utility-list');
        }
    }

    render() {
        const { errors } = this.state;
        return (<div className="form-wrapper">
            <div className="container" style={{ marginTop: '50px'}}>
                <h2 style={{ marginBottom: '40px' }}>Add utility</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Title"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.title
                            })}
                            name="title"
                            onChange={this.handleInputChange}
                            value={this.state.title}
                        />
                        {errors.title && (<div className="invalid-feedback">{errors.title}</div>)}
                    </div>
                    <div className="form-group">
                        <CategoryList handleInputChange={this.handleInputChange} />
                        {errors.category && (<div className="invalid-feedback">{errors.category}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Description"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.description
                            })}
                            name="description"
                            onChange={this.handleInputChange}
                            value={this.state.description}
                        />
                        {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder="Price"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.price
                            })}
                            name="price"
                            onChange={this.handleInputChange}
                            value={this.state.price}
                        />
                        {errors.price && (<div className="invalid-feedback">{errors.price}</div>)}
                    </div>
                    <div className="form-group">
                        <select name="town" onChange={this.handleInputChange}
                            className={classnames({
                                'is-invalid': errors.town
                            })}>
                            <TownList />
                        </select>
                        {errors.town && (<div className="invalid-feedback">{errors.town}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
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

export default connect(mapStateToProps, { addUtility })(withRouter(CreateUtility))