import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateUtility extends Component {

    constructor(props) {
        super(props)

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
            phone: ''
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
            creatorId: this.state.creatorId,
            phone: this.state.phone

        };
        axios.post('http://localhost:4000/utility/create-utility', utilityObject)
            .then(res => console.log(res.data));

        this.setState({title: '', category: '', description: '', price: '', creatorId: '', phone: ''})
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={this.state.title} onChange={this.onChangeUtilityTitle}/>
                </Form.Group>

                <Form.Group controlId="Category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" value={this.state.category} onChange={this.onChangeUtilityCategory}/>
                </Form.Group>

                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={this.state.description}
                                  onChange={this.onChangeUtilityDescription}/>
                </Form.Group>

                <Form.Group controlId="Price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" value={this.state.price} onChange={this.onChangeUtilityPrice}/>
                </Form.Group>

                <Form.Group controlId="Phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="phone" value={this.state.phone} onChange={this.onChangeUtilityPhone}/>
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Create Utility
                </Button>
            </Form>
        </div>);
    }
}