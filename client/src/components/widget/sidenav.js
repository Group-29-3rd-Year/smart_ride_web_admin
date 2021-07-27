import React, { Fragment, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TableChartIcon from '@material-ui/icons/TableChart';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import RemoveIcon from '@material-ui/icons/Remove';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import StreetviewIcon from '@material-ui/icons/Streetview';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { makeStyles } from '@material-ui/core/styles';
import './sidenav.css';
import { Button } from '@material-ui/core';
import AddBus from '../pages/addBus';

import {
    BrowserRouter as Router, 
    Switch, 
    Route,
    Link, 
    Redirect,
    useHistory
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    
    submit: {
      width: '140px',
      height: '40px',
      fontSize: 18,
      fontWeight: 700,
      borderRadius: 20,
    },
}));

const SideNav = ({ setAuth }) => {

    const classes = useStyles();

    const [expand1, setExpand1] = useState(false);
    const [expand2, setExpand2] = useState(false);
    const [expand3, setExpand3] = useState(false);
    const [expand4, setExpand4] = useState(false);
    const [expand5, setExpand5] = useState(false);

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")   //check logout
        setAuth(false);
    }

    let history = useHistory();

    return (
        <Fragment>
            <div className="side-menu">

                {/* <div className="top-section">
                    <div className="logo">
                        <img  />
                    </div>
                </div> */}
                {/* <div className="search-controller">
                    <button className="search-btn">
                        <SearchIcon />
                    </button>
                    
                    <input type="text" placeholder="Search"/> 
                </div>

                <div className="divider"></div> */}

                <div className="main-menu">
                    <ul>

                        <li>
                            <a className="menu-item" onClick={() => {history.push("../smartride/dashboard");}}>
                                <div className="menu-icon">
                                    <TableChartIcon />
                                </div>
                                Dashboard
                            </a>
                        </li>

                        <li>
                            <a onClick= {() => setExpand1(!expand1)} className="menu-item">
                                <div className="menu-icon">
                                    <DirectionsBusIcon />
                                </div>
                                Bus Details
                            </a>
                            <div className={`sub-menu1 ${expand1 ? "active1" : ""}`}>
                                <ul>
                                    <li>
                                        <a className="sub-menu-item" onClick={() => {history.push("../addBus");}}>
                                            {/* <Link to="../pages/addBus"></Link> */}
                                            {/* <Route path="../pages/aadBus" component={AddBus} /> */}
                                            <div className="menu-icon">
                                                <AddIcon />
                                            </div>
                                            Add Bus
                                        </a>
                                    </li>
                                    <li>
                                        <a className="sub-menu-item" onClick={() => {history.push("../updatebus");}}>
                                            <div className="menu-icon">
                                                <UpdateIcon />
                                            </div>
                                            Update/Delete Bus
                                        </a>
                                    </li>
                                    <li>
                                        <a className="sub-menu-item" onClick={() => {history.push("../viewbus");}}>
                                            <div className="menu-icon">
                                                <ListIcon />
                                            </div>
                                            View Busses
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <a onClick= {() => setExpand2(!expand2)} className="menu-item">
                                <div className="menu-icon">
                                    <EmojiPeopleIcon />
                                </div>
                                Conductor Details
                            </a>
                            <div className={`sub-menu2 ${expand2 ? "active2" : ""}`}>
                                <ul>
                                    {/* <li>
                                        <a className="sub-menu-item">
                                            <div className="menu-icon">
                                                <AddIcon />
                                            </div>
                                            Add Conductor
                                        </a>
                                    </li> */}
                                    <li>
                                        <a className="sub-menu-item" onClick={() => {history.push("../updateconductor");}}>
                                            <div className="menu-icon">
                                                <UpdateIcon />
                                            </div>
                                            Update/Delete Conductor
                                        </a>
                                    </li>
                                    <li>
                                        <a className="sub-menu-item" onClick={() => {history.push("../viewconductor");}}>
                                            <div className="menu-icon">
                                                <RemoveIcon />
                                            </div>
                                            View Conductor
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <a onClick= {() => setExpand3(!expand3)} className="menu-item">
                                <div className="menu-icon">
                                    <StreetviewIcon />
                                </div>
                                Route Details
                            </a>
                            <div className={`sub-menu3 ${expand3 ? "active3" : ""}`}>
                                <ul>
                                    <li>
                                        <a className="sub-menu-item" onClick={() => {history.push("../addhalt");}}>
                                            {/* <Link to="../pages/addBus"></Link> */}
                                            {/* <Route path="../pages/aadBus" component={AddBus} /> */}
                                            <div className="menu-icon">
                                                <AddIcon />
                                            </div>
                                            Add Halt
                                        </a>
                                    </li>
                                    <li>
                                        <a className="sub-menu-item" onClick={() => {history.push("../viewhalt");}}>
                                            <div className="menu-icon">
                                                <RemoveIcon />
                                            </div>
                                            View Halts
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <a href="#" className="menu-item">
                                <div className="menu-icon">
                                    <MapIcon />
                                </div>
                                Route Map
                            </a>
                        </li>

                        <li>
                            <a onClick= {() => setExpand5(!expand5)} className="menu-item">
                                <div className="menu-icon">
                                    <TrendingUpIcon />
                                </div>
                                Fare Rates
                            </a>
                            <div className={`sub-menu5 ${expand5 ? "active5" : ""}`}>
                                <ul>
                                    <li>
                                        <a className="sub-menu-item" onClick={() => {history.push("../addfare");}}>
                                            {/* <Link to="../pages/addBus"></Link> */}
                                            {/* <Route path="../pages/aadBus" component={AddBus} /> */}
                                            <div className="menu-icon">
                                                <AddIcon />
                                            </div>
                                            Add Fare Rates
                                        </a>
                                    </li>
                                    <li>
                                        <a className="sub-menu-item" onClick={() => {history.push("../updatefare");}}>
                                            <div className="menu-icon">
                                                <UpdateIcon />
                                            </div>
                                            Update/Delete Fare Rates
                                        </a>
                                    </li>
                                    <li>
                                        <a className="sub-menu-item" onClick={() => {history.push("../viewfare");}}>
                                            <div className="menu-icon">
                                                <RemoveIcon />
                                            </div>
                                            View Fare Rates
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <a href="#" className="menu-item">
                                <div className="menu-icon">
                                    <EqualizerIcon />
                                </div>
                                Stats
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div className="side-menu-footer">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="default"              //// have to check path
                        className={classes.submit}
                        onClick={ e => logout.bind(e)}
                    >
                        Log Out
                    </Button>
                    {/* <button onClick={ e => logout(e)}>Log Out</button> */}
                </div>
            </div>
        </Fragment>
        
    );
};

export default SideNav;