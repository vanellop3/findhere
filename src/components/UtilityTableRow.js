import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";

class StudentTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent() {
        var r = window.confirm("Are you sure?");
        if (r == true) {
            axios.delete('http://localhost:4000/utility/delete-utility/' + this.props.obj._id)
                .then((res) => {
                    alert('successfully deleted');
                    window.location.reload();
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            console.log('Item is not deleted');
        }
    }

    categoryImg() {
          switch(this.props.obj.category){
              case 'animal services': return <div> <img src={require('../img/key.pbg')}/></div>;
          case 'babysitters': return <div> babysitters</div>;
          case 'car repair': return <div> car repair</div>;
          case 'cleaning': return <div> animal</div>;
          case 'gardening services': return <div> animal</div>;
          case 'house repair': return <div> animal</div>;
          default: return <div> animal</div>
      }

    }

    render() {
        console.log(this.props.user);
        const isAdmin = this.props.auth.user.isAdmin;
        const logged = this.props.auth.user.id;
        if (isAdmin === true || logged === this.props.obj.creatorId) {
            return (
                // <tr>
                <Card>
  <Card.Header as="h5">{this.props.obj.title}</Card.Header>
  <Card.Body>
      {this.categoryImg()}
    <Card.Title>{this.props.obj.category}</Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
                    // <td>{this.props.obj.title}</td>
                    // <td>{this.props.obj.category}</td>
                    // <td>{this.props.obj.description}</td>
                    // <td>{this.props.obj.price}</td>
                    // <td>{this.props.obj.phone}</td>
                    // <td>{this.props.obj.town}</td>
                    // <td>
                        // <Link className="edit-link" to={"/edit-utility/" + this.props.obj._id}>
                        //     Edit
                        // </Link>
                        // <Button onClick={this.deleteStudent} size="sm" variant="danger">Delete</Button>
                    // {/* </td> */}
                // {/* </tr> */}
            );
        } else {
            return (
                <tr>
                    <td>{this.props.obj.title}</td>
                    <td>{this.props.obj.category}</td>
                    <td>{this.props.obj.description}</td>
                    <td>{this.props.obj.price}</td>
                    <td>{this.props.obj.phone}</td>
                    <td>{this.props.obj.town}</td>
                    {/*<td>*/}
                    {/*    <Link className="edit-link" to={"/edit-utility/" + this.props.obj._id}>*/}
                    {/*        Edit*/}
                    {/*    </Link>*/}
                    {/*    <Button onClick={this.deleteStudent} size="sm" variant="danger">Delete</Button>*/}
                    {/*</td>*/}
                </tr>
            );
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(StudentTableRow);