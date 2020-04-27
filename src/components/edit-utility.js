import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import TownList from '../components/TownList';

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
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={this.state.title} name="title" onChange={this.handleInputChange}/>
                </Form.Group>

                <Form.Group controlId="Category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" value={this.state.category} name="category"
                                  onChange={this.handleInputChange}/>
                </Form.Group>

                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={this.state.description}
                                  onChange={this.handleInputChange}/>
                </Form.Group>

                <Form.Group controlId="Price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" value={this.state.price} name="price" onChange={this.handleInputChange}/>
                </Form.Group>

                <div className="form-group" controlId="town">
                        <select name="town"  onChange={this.handleInputChange}>
                                <TownList/>
                        </select>
                    </div>

                <Form.Group controlId="Phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="phone" value={this.state.phone} name="phone" onChange={this.handleInputChange}/>
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Update Utility
                </Button>
            </Form>
        </div>);
    }
}