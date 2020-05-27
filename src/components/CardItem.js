import React, {Component, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardModal from "./Card-Modal";


const CardItem = (props) => {

    function categoryImg() {
        switch (props.obj.category) {
            case 'animal services':
                return <div><img class="card__img" src={require('../img/animal-serv.png')}/></div>;
            case 'babysitters':
                return <div><img class="card__img" src={require('../img/babysitters.png')}/></div>;
            case 'car repair':
                return <div><img class="card__img" src={require('../img/cars.png')}/></div>;
            case 'cleaning':
                return <div><img class="card__img" src={require('../img/cleaning.png')}/></div>;
            case 'gardening services':
                return <div><img class="card__img" src={require('../img/garden.png')}/></div>;
            case 'house repair':
                return <div><img class="card__img" src={require('../img/house.png')}/></div>;
            default:
                return <div> no category image</div>
        }
    }

    return (
        <Card className="text-center">
            <Card.Body>
                <div className="text-wrapper">
                    {categoryImg()}
                    <Card.Title>{props.obj.category}</Card.Title>
                    <Card.Text>{props.obj.title}</Card.Text>
                </div>
            </Card.Body>
            <CardModal title={props.obj.title} desc={props.obj.description}
                       place={props.obj.town} phone={props.obj.phone} category={props.obj.category}
                       categoryImg={categoryImg} price={props.obj.price}/>
        </Card>
    )
        ;
}

export default CardItem;