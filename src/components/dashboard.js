import { Button, Grid } from '@material-ui/core';
import React, {Fragment} from 'react';
import Header from './widget/header';
import SideNav from './widget/sidenav';
import './style/dash.css';

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
                <div className="backgroundImgdash"></div>
                   
            </div>

            

        </Fragment>

        
        );
};


export default Dashboard;