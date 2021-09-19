import { Button, Grid } from '@material-ui/core';
import React, {Fragment} from 'react';
import './style/dashboard.css';
import Header from './widget/header';
import SideNav from './widget/sidenav';

const Dashboard = ({ setAuth }) => {

    return(
        <Fragment>
            <div className="body">
                {/* <Grid > */}
                <Header />
                {/* </Grid > */}
                
                {/* <Grid > */}
                    <SideNav />
                {/* </Grid > */}

                <Button />
                <div className="backgroundImg"></div>
            </div>
        </Fragment>
    );
};


export default Dashboard;