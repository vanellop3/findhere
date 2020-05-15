import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from './Pagination';


const SearchBar = (props) => {
    const [searchOption, setSearchOption] = useState('');
    const [utilities, setUtility] = useState([]);
    const [searchResults, setSearchResults] = useState(utilities);

    const handleChange = event => {
        setSearchOption(event.target.value);
    };

   const fetchData = () => {
        axios.get('http://localhost:4000/utility/')
        .then(res => {
            var arr = res.data;
            setUtility(arr);
        })
        .catch((error) => {
            console.log(error);
        })

    }
    useEffect(() => {
        fetchData();
        const results = utilities.filter(item =>
            item.title.toLowerCase().includes(searchOption) || item.description.toLowerCase().includes(searchOption));
            console.log(results);
            setSearchResults(results);
            }, [searchOption])

    return (
        
        <div className="latest-wrap centered--column">
            <input
                type="text"
                placeholder="Search now!"
                value={searchOption}
                onChange={handleChange}
            />
            {/* {!!searchResults.length ? */}
     <Pagination  start={1} perPage={4} utilities={searchResults}/>
{/* : */}
            {/* <Pagination  start={1} perPage={4} utilities={utilities}/> } */}

        </div>
    )
}

export default SearchBar;