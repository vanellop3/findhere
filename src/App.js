import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import CreateUtility from "./components/create-utility";
import EditUtility from "./components/edit-utility";
import UtilityList from "./components/utilities-list";
import Login from "./components/Login";
import Register from "./components/Register";
import store from "./store";
import {Provider} from "react-redux";
import setAuthToken from "./setAuthToken";
import jwt_decode from 'jwt-decode';
import {setCurrentUser, logoutUser} from './actions/authentication';
import Navbar from "./components/Navbar";

console.log(localStorage.jwtToken);

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Navbar/>
                    {/*<Link to={"/create-utility"} className="nav-link">*/}
                    {/*    Create Student*/}
                    {/*</Link>*/}
                    <Link to={"/utility-list"} className="nav-link">
                        Student List
                    </Link>

                    <div className="wrapper">
                        <Switch>
                            {/*<Route exact path='/' component={CreateUtility}/>*/}
                            <Route path="/create-utility" component={CreateUtility}/>
                            <Route path="/edit-utility/:id" component={EditUtility}/>
                            <Route path="/utility-list" component={UtilityList}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default App;