import React, {useEffect, useState} from "react";


const SearchBar = (props) => {
    const [searchOption, setSearchOption] = useState('');
    const [searchResults, setSearchResults] = useState();
    const handleChange = event => {
        setSearchOption(event.target.value);
        const results = props.utilities.filter(item =>
            item.title.toLowerCase().includes(searchOption) || item.description.toLowerCase().includes(searchOption));
        setSearchResults(results);
        console.log();
    };

    useEffect(() => {
        const results = props.utilities.filter(item =>
            item.title.toLowerCase().includes(searchOption) || item.description.toLowerCase().includes(searchOption));
        // setSearchResults(results);
        console.log();
    }, [searchOption]);

    return (
        <div className="App">
            <input
                type="text"
                placeholder="Search"
                value={searchOption}
                onChange={handleChange}
            />
            {/*{ props.filteringUtilities(searchResults)}*/}
            {console.log(searchResults)}
            {/*{console.log(searchResults && searchResults.map(item => (*/}
            {/*    <li>{item.title}</li>*/}
            {/*)))}*/}
            {/*<ul>*/}
            {/*    {searchResults.map(item => (*/}
            {/*        <li>{item}</li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    )
}

export default SearchBar;