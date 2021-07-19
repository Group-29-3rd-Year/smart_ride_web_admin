import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import React, { Fragment, useState } from 'react';
import { GoogleApiWarpper} from '@react-google-maps/api';
import {GoogleMap, InfoWindow, Marker, GoogleApiWrapper} from '@react-google-maps/api';
import Header from '../widget/header';
import SideNav from '../widget/sidenav';
import 'react-toastify/dist/ReactToastify.css';


const RouteMap = () => {
    return( 
        <Fragment>
            <Header />
            <SideNav />
            <div className="body">
                <div className="route_map_container">
                    <GoogleMap google={this.props.google} zoom={14}>
    
                        <Marker onClick={this.onMarkerClick}
                                name={'Current location'} />

                        <InfoWindow onClose={this.onInfoWindowClose}>
                            <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                            </div>
                        </InfoWindow>
                    </GoogleMap>
                </div>
            </div>
        </Fragment>
    )
};

export default RouteMap;