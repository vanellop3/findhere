import React from 'react';

const CategoryList = () => {
    return (
        <>
            <option selected="true" disabled="disabled">Choose category</option>
            <option value="all">ALL</option>
            <option value="animal services">Animal services</option>
            <option value="babysitters">Babysitters</option>
            <option value="car repair">Car repair</option>
            <option value="cleaning">Cleaning</option>
            <option value="gardening services">Gardening services</option>
            <option value="house repair">House repair</option>
        </>
    )
}

export default CategoryList
