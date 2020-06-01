import React, {Component} from "react";
import axios from 'axios';
import TownList from '../components/TownList';
import CategoryList from '../components/CategoryList';
import {connect} from "react-redux";
import classnames from "classnames";

class EditUtility extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        // State
        this.state = {
            title: '',
            category: '',
            description: '',
            price: '',
            town: '',
            phone: '',
            isRadioSelected: false,
            currency: ''
        }
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        } else {
            axios.get('http://localhost:4000/utility/edit-utility/' + this.props.match.params.id)
                .then(res => {
                    if (res.data.creatorId !== this.props.auth.user.id) {
                        alert('You are not allowed no access this page');
                        this.props.history.push('/my-utilities');
                    } else {
                        console.log();
                        this.setState({
                            title: res.data.title,
                            category: res.data.category,
                            description: res.data.description,
                            price: res.data.price.slice(0, -3),
                            town: res.data.town,
                            phone: res.data.phone
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const utilityObject = {
            title: this.state.title,
            category: this.state.category,
            description: this.state.description,
            price: this.state.price + this.state.currency,
            town: this.state.town,
            phone: this.state.phone
        };

        axios.put('http://localhost:4000/utility/update-utility/' + this.props.match.params.id, utilityObject)
            .then((res) => {
                console.log(res.data)
                console.log('Utility successfully updated')
            }).catch((error) => {
            console.log(error)
        })

        // Redirect to Utility List
        this.props.history.push('/utility-list')
    }

    changeHandler = () => {
        this.setState({isRadioSelected: true});
    };

    render() {
        return (<div className="form-wrapper">

            <div className="container">
                <h2 style={{marginBottom: '40px'}}>Edit utility</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            className={'form-control form-control-lg'}
                            onChange={this.handleInputChange}
                            value={this.state.title}
                        />
                    </div>
                    <div className="form-group">
                        <select name="category" onChange={this.handleInputChange}>
                            <CategoryList/>
                        </select>
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            className={'form-control form-control-lg'}
                            onChange={this.handleInputChange}
                            value={this.state.description}
                        />
                    </div>
                    <div className="form-group price">
                        <label className="button--radio">
                            <input type="radio" onChange={this.changeHandler}/>
                            <span>Discuss later</span>
                        </label>
                        <input
                            placeholder="Price"
                            disabled={this.state.isRadioSelected}
                            className={classnames('form-control form-control-lg')}
                            name="price"
                            onChange={this.handleInputChange}
                            value={this.state.price}
                        />

                        <select className="currency-selector" name="currency" onChange={this.handleInputChange}
                                disabled={this.state.isRadioSelected}>
                            <option data-symbol="$" data-placeholder="0.00" selected>USD</option>
                            <option data-symbol="€" data-placeholder="0.00">EUR</option>
                            <option data-symbol="£" data-placeholder="0.00">BGN</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select name="town" onChange={this.handleInputChange}>
                            <TownList/>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Phone: </label>
                        <input
                            type="tel"
                            name="phone"
                            className={'form-control form-control-lg'}
                            onChange={this.handleInputChange}
                            value={this.state.phone}
                        />
                    </div>
                    <div className="form-group">
                        <span>* Keep in mind that this won't change creation date!</span>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn--primary">
                            Edit Utility
                        </button>
                    </div>
                </form>
            </div>
        </div>);
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(EditUtility);