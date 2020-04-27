import React from 'react';
import data from '../towns.json';

const TownList = () => {

  return(
      <>
      <option>Choose town</option>
      {data.map(town =>
      <option
      value={town.city}>{town.city}</option>)}
  </>
  )
}

export default TownList
