import React, {Component} from "react";
import axios from 'axios';
import CategoryList from "./CategoryList";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";


class UtilitytList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            utilities: [],
            choice: '',
            cityChoice: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.filteringUtilities = this.filteringUtilities.bind(this);

    }

    componentDidMount() {
        this.fetchData();
    }

    getLocation() {
        axios.get("https://ipinfo.io?token=35797a9aa82ded")
            .then(res => {
                console.log(res.data.city);
                this.setState({
                    cityChoice: res.data.city
                })
            })
        setTimeout(function () {
            this.fetchData();
        }.bind(this), 1200);
    }

    fetchData = () => {
        console.log(this.state.choice);

        axios.get('http://localhost:4000/utility/')
            .then(res => {
                if (this.state.choice != '') {
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
                } else if (this.state.cityChoice != '') {
                    this.setState({
                        utilities: res.data.filter(item => item.town === this.state.cityChoice)
                    });
                    this.state.cityChoice = '';
                } else {
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

    filteringUtilities(value) {
        console.log('vliza tukkk');
        this.setState({
            utilities: value
        });
    }

    render() {

        return (
            <div className="search-wrap">
                <div className="centered--column">
                    <SearchBar utilities={this.state.utilities}
                               filteringUtilities={this.filteringUtilities}/>
                    <CategoryList handleInputChange={this.handleInputChange}/>
                    <button className="btn--primary" onClick={this.getLocation}>Get utilities near you</button>
                </div>
                <Pagination start={1} perPage={2} utilities={this.state.utilities}/>
            </div>
        );
    }
}


export default UtilitytList