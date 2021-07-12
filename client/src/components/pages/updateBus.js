import { toast } from 'react-toastify';
import React, { Fragment, useState } from 'react';
import Header from '../widget/header';
import SideNav from '../widget/sidenav';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const UpdateBus = () => {
    return(
        <Fragment>
            <div className="body">
                <Header />
                <SideNav />
            </div>
        </Fragment>
    
    )
};

export default UpdateBus;
