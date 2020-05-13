import React, {useEffect, useState} from 'react';
import CardItem from "./CardItem";

const Pagination = (props) => {

    function handlePageClick(event) {
        setCurrentPage(Number(event.target.id));
    }

    const [currentPage, setCurrentPage] = useState(props.start);
    const utilitiesPerPage = props.perPage;
    const utilities = props.utilities;
    const indexOfLastUtility = currentPage * utilitiesPerPage;
    const indexOfFirstUtility = indexOfLastUtility - utilitiesPerPage;
    const currentUtility = utilities.slice(indexOfFirstUtility, indexOfLastUtility);
    const renderUtilities = currentUtility.map((res, index) => {
        return <CardItem obj={res} key={index}/>;
    });


    function showPageNumbers() {
        setCurrentPage(1);
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(utilities.length / utilitiesPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => showPageNumbers
        , [props.utilities]);

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li
                key={number}
                id={number}
                onClick={handlePageClick}
                className={currentPage === number ? 'active' : ''}
            >
                {number}
            </li>
        );
    });

    return (
        !!currentUtility.length ? <>
            <div className="utilities--search">
                {renderUtilities}
            </div>
            <ul className="page-numbers">
                « {renderPageNumbers} »
            </ul>
        </> : <p className="utilities--search">no data</p>

    )
}

export default Pagination
