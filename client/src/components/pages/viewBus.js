import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import React, { Fragment, useState } from 'react';
import Header from '../widget/header';
import SideNav from '../widget/sidenav';
import 'react-toastify/dist/ReactToastify.css';
import '../style/viewbus.css';

toast.configure();

const ViewBus = () => {
    return(
        <Fragment>
            <div className="body">
                <Header />
                <SideNav />

                <div className="view_bus_container">

                </div>
            </div>
        </Fragment>
    );
};


export default ViewBus;