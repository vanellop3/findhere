import React, { Component, useEffect, useState } from "react";
import Banner from "./Banner";
import UtilitytList from "./utilities-list";
import Collapse from 'react-bootstrap/Collapse';
import Info from "./Info";
import Footer from "./Footer";
import LatestUtilities from './LatestUtilities';

const Main = () => {

  return (
  <div className="">
    <Banner />
    <Info title="Here you can find" description="specialists from all kind of places" />
    <LatestUtilities/>
    <Info className="colored" title="Looking for utility" description="This is the right place" />
    <UtilitytList/>
    <Info className="dark" title="Wanna share you knowledge and earn money" button="Register now" />
    <Footer/>
  </div>);
}

export default Main;