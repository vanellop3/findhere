import React, { Component, useEffect, useState } from "react";
import axios from 'axios';
import CardItem from './CardItem';
import Banner from "./Banner";
import UtilitytList from "./utilities-list";
import Collapse from 'react-bootstrap/Collapse';

const UserUtilities = () => {
    const [utilities, setUtility] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/utility/')
            .then(res => {
                var arr = res.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                arr = arr.slice(0, 3);
                setUtility(arr);
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])

    const DataTable = () => {
        return utilities.map((res, i) => {
            return <CardItem obj={res} key={i} />;
        });
    }


    return (
        <>
            <div className="utility-wrap">
                {DataTable()}
            </div>
        </>
    );
}

export default UserUtilities;