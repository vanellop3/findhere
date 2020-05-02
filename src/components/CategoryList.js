import React from 'react';

const CategoryList = (props) => {

  return (
    <div className="category-list">
      <select name="category" onChange={props.handleInputChange}>
        <option value="all">ALL</option>
        <option value="animal services">Animal services</option>
        <option value="babysitters">Babysitters</option>
        <option value="car repair">Car repair</option>
        <option value="cleaning">Cleaning</option>
        <option value="gardening services">Gardening services</option>
        <option value="house repair">House repair</option>
      </select>
    </div>
  )
}

export default CategoryList
