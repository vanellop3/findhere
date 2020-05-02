import React, { Component } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Table';
import UtilityTableRow from './UtilityTableRow';
import CardItem from "./CardItem";
import CategoryList from "./CategoryList";


class UtilitytList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            utilities: [],
            choice: '',
            cityChoice: '',
            currentPage: 1,
            todosPerPage: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);

    }

    componentDidMount() {
        this.fetchData();
    }

    handlePageClick(event) {
        console.log(event.target.id);
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    getLocation() {
        axios.get("https://ipinfo.io?token=35797a9aa82ded")
            .then(res => {
                console.log(res.data.city);
                this.setState({
                    cityChoice: res.data.city
                })
            })
        setTimeout(function () { this.fetchData(); }.bind(this), 1200);
    }


    fetchData = () => {
        axios.get('http://localhost:4000/utility/')
            .then(res => {
                if (this.state.choice != '') {
                    console.log('purviq if');
                    if (this.state.choice === 'all') {
                        this.setState({
                            utilities: res.data
                        });
                        this.state.choice = '';
                    } else {
                        this.setState({
                            utilities: res.data.filter(item => item.category === this.state.choice)
                        });
                        this.state.choice = '';
                    }
                }
                else if (this.state.cityChoice != '') {
                    console.log('vtoriq if');
                    this.setState({
                        utilities: res.data.filter(item => item.town === this.state.cityChoice)
                    });
                    this.state.cityChoice = '';
                }
                else {
                    console.log('elsa');
                    this.setState({
                        utilities: res.data
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleInputChange(e) {
        this.setState({
            choice: e.target.value
        })

        this.fetchData();
    }


    render() {
        const { utilities, currentPage, todosPerPage } = this.state;

        console.log(currentPage);
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = utilities.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderTodos = currentTodos.map((res, index) => {
            return <CardItem obj={res} key={index} />;
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(utilities.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePageClick}
                    className={currentPage === number ? 'active' : ''}
                >
                    {number}
                </li>
            );
        });

        return (
            <div>

                {/* <div className="category-list">
                    <select name="category" onChange={this.handleInputChange}>
                        <option value="all">ALL</option>
                        <option value="animal services">Animal services</option>
                        <option value="babysitters">Babysitters</option>
                        <option value="car repair">Car repair</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="gardening services">Gardening services</option>
                        <option value="house repair">House repair</option>
                    </select>
                </div> */}
                <CategoryList handleInputChange={this.handleInputChange} />
                <button className="btn--primary" onClick={this.getLocation}>get location </button>
                <div className="utility-wrap--search">
                    {renderTodos}
                </div>
                <ul className="page-numbers">
                    « {renderPageNumbers} »
                </ul>
            </div>
        );


    }
}


export default UtilitytList