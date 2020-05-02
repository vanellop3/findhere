import React, { Component, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const CardItem = (props) => {

  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded(!expanded);
      console.log(this);
  }

  function categoryImg() {
    switch (props.obj.category) {
      case 'animal services': return <div> <img class="card__img" src={require('../img/animal-serv.png')} /></div>;
      case 'babysitters': return <div> <img class="card__img" src={require('../img/babysitters.png')} /></div>;
      case 'car repair': return <div> <img class="card__img" src={require('../img/cars.png')} /></div>;
      case 'cleaning': return <div> <img class="card__img" src={require('../img/cleaning.png')} /></div>;
      case 'gardening services': return <div> <img class="card__img" src={require('../img/garden.png')} /></div>;
      case 'house repair': return <div> <img class="card__img" src={require('../img/house.png')} /></div>;
      default: return <div> animal</div>
    }

  }

  return (
    <Card className="text-center">
      {categoryImg()}
      <Card.Header as="h5"></Card.Header>
      <Card.Body>
        <Card.Title>{props.obj.category}</Card.Title>
        <Card.Text>
          Price: {props.obj.price}$ </Card.Text>
        <button onClick={toggleExpanded} className="btn--primary">More info</button>
        <div className={`${expanded ? 'expanded-card' : 'normal-card'}`}>
          <Card.Text> {props.obj.title}</Card.Text>
          <Card.Text> Description: {props.obj.description}</Card.Text>
          <Card.Text> Place: {props.obj.town}</Card.Text>
        </div>
      </Card.Body>
      {/* <Card.Footer className="text-muted">Call now: {props.obj.phone}</Card.Footer> */}
    </Card>
  );
}

export default CardItem;