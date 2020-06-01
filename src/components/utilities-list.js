import React, {Component} from "react";
import axios from 'axios';
import CategoryList from "./CategoryList";
import Pagination from "./Pagination";


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
        this.sortByDate = this.sortByDate.bind(this);
        this.sortByPriceАsc = this.sortByPriceАsc.bind(this);
        this.sortByPriceDsc = this.sortByPriceDsc.bind(this);

    }

    componentDidMount() {
        this.fetchData();
    }

    getLocation() {
        axios.get("https://ipinfo.io?token=35797a9aa82ded")
            .then(res => {
                this.setState({
                    cityChoice: res.data.city
                })
            })
        setTimeout(function () {
            this.fetchData();
        }.bind(this), 1200);
    }

    fetchData = () => {
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

    sortByDate() {
        this.setState({
            utilities: this.state.utilities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        })
    }

    sortByPriceDsc() {
        console.log(this.state.utilities.sort((a, b) => b.price - a.price));
        this.setState({
            utilities: this.state.utilities.sort((a, b) => b.price - a.price)
        })
    }

    sortByPriceАsc() {
        console.log(this.state.utilities.sort((a, b) => b.price - a.price));
        this.setState({
            utilities: this.state.utilities.sort((a, b) => a.price - b.price)
        })
    }

    handleInputChange(e) {
        this.setState({
            choice: e.target.value
        })

        this.fetchData();
    }


    render() {
        return (
            <div className="search-wrap">
                <div className="centered--column">
                    <select name="category" onChange={this.handleInputChange}>
                        <CategoryList/>
                    </select>
                    <button className="btn--primary" onClick={this.getLocation}>Get utilities near you</button>
                    <div className="button__wrap">
                        <button className="btn--special" onClick={this.sortByDate}>Sort By date</button>
                        <button className="btn--special" onClick={this.sortByPriceАsc}>Sort By priceASC ⬆</button>
                        <button className="btn--special" onClick={this.sortByPriceDsc}>Sort By priceDSC ⬇</button>
                    </div>
                </div>
                <Pagination start={1} perPage={6} utilities={this.state.utilities}/>
            </div>
        );
    }
}


export default UtilitytList