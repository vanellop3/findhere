import React, { Component, useEffect, useState } from "react";
import axios from 'axios';
import CardItem from './CardItem';
import Banner from "./Banner";
import UtilitytList from "./utilities-list";
import Collapse from 'react-bootstrap/Collapse';
import Info from "./Info";
import LatestUtilities from './LatestUtilities';

const Main = () => {

  return (
  <div className="">
    <Banner />
    <Info title="Here you can find" description="latest utilities" />
    <LatestUtilities/>
    <Info title="Looking for utility" description="This is the right place" />
    <UtilitytList/>

  </div>);
}

export default Main;