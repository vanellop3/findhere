import React, { Component, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const CardItem = (props) => {

  const[expanded, setExpanded] = useState(false);
  // constructor(props) {
    // super(props);
    // this.state = {
    //   expanded: false,
    // }
    // this.toggleExpanded = this.toggleExpanded.bind(this);

  // }

  function toggleExpanded() {
    setExpanded(!expanded);
    // this.setState({ expanded: !this.state.expanded });
  }

  function categoryImg() {
    switch (props.obj.category) {
      case 'animal services': return <div> <img src={require('../img/key.pbg')} /></div>;
      case 'babysitters': return <div> babysitters</div>;
      case 'car repair': return <div> car repair</div>;
      case 'cleaning': return <div> animal</div>;
      case 'gardening services': return <div> animal</div>;
      case 'house repair': return <div> animal</div>;
      default: return <div> animal</div>
    }

  }

    return (
      <Card className="text-center">
        {categoryImg()}
        <Card.Header as="h5">{props.obj.title}</Card.Header>
        <Card.Body>
          <Card.Title>{props.obj.category}</Card.Title>
          <Card.Text>
            Price: {props.obj.price}$ </Card.Text>
          <Button onClick={toggleExpanded} variant="primary">More info</Button>
          <div className={`${expanded ? 'expanded-card' : 'normal-card'}`}>
            <Card.Text> Description: {props.obj.description}</Card.Text>
            <Card.Text> Place: {props.obj.town}</Card.Text>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">Call now: {props.obj.phone}</Card.Footer>
      </Card>
    );
  }

export default CardItem;