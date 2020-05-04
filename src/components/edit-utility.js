import React, { Component } from "react";
import axios from 'axios';
import TownList from '../components/TownList';
import CategoryList from '../components/CategoryList';

export default class EditUtility extends Component {

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
            phone: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/utility/edit-utility/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    category: res.data.category,
                    description: res.data.description,
                    price: res.data.price,
                    town: res.data.town,
                    phone: res.data.phone
                });
            })
            .catch((error) => {
                console.log(error);
            })
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
            price: this.state.price,
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

        // Redirect to Student List
        this.props.history.push('/utility-list')
    }


    render() {
        return (<div className="form-wrapper">

            <div className="container" style={{ marginTop: '50px' }}>
                <h2 style={{ marginBottom: '40px' }}>Edit utility</h2>
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
                        <CategoryList handleInputChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="description"
                            className={'form-control form-control-lg'}
                            onChange={this.handleInputChange}
                            value={this.state.description}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            name="price"
                            className={'form-control form-control-lg'}
                            onChange={this.handleInputChange}
                            value={this.state.price}
                        />
                    </div>
                    <div className="form-group">
                        <select name="town" onChange={this.handleInputChange}>
                            <TownList />
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
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
        </div >);
    }
}