import React, {useState} from 'react';
import CardItem from "./CardItem";

const Pagination = (props) => {

    function handlePageClick(event) {
        console.log(event.target.id);
        setCurrentPage(Number(event.target.id));
    }

    const [currentPage, setCurrentPage] = useState(props.start);
    const todosPerPage = props.perPage;
    const utilities = props.utilities;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = utilities.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderTodos = currentTodos.map((res, index) => {
        return <CardItem obj={res} key={index}/>;
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
                onClick={handlePageClick}
                className={currentPage === number ? 'active' : ''}
            >
                {number}
            </li>
        );
    });

    return (
        !!currentTodos.length ? <>
            <div className="utilities--search">
                {renderTodos}
            </div>
            <ul className="page-numbers">
                « {renderPageNumbers} »
            </ul>
        </> : <p className="utilities--search">no data</p>

    )
}

export default Pagination
