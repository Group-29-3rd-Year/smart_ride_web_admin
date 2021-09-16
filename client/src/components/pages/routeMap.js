import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import React, { Component } from 'react';
//import React, { Fragment, useState } from 'react';
//import { GoogleApiWarpper } from '@react-google-maps/api';
//import {GoogleMap, InfoWindow, Marker, GoogleApiWrapper} from '@react-google-maps/api';
import Header from '../widget/header';
import SideNav from '../widget/sidenav';
import 'react-toastify/dist/ReactToastify.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {geocodeByAddress,getLatLng,} from 'react-places-autocomplete';



export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',

            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},

            mapCenter: {
                lat: 6.040200,
                lng: 80.220642
            }

        }
    };

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                this.setState({ address });
                this.setState({ mapCenter: latLng });
            })
            .catch(error => console.error('Error', error)
            );
    };

    render() {
        
        <div>
            <h2>Bus Register</h2>
        </div>
        
        return (

                <div id="googleMap">

                    {/* <Grid> */}
                    <Header />
                    {/* </Grid> */}
                    {/* <Grid> */}
                    <SideNav />
                    {/* </Grid> */}
                    {/* <Grid> */}

                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>


                    <Map google={this.props.google}
                        initialCenter={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}
                        center={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}
                    >
                        <Marker
                            position={{
                                lat: this.state.mapCenter.lat,
                                lng: this.state.mapCenter.lng
                            }}
                        />

                        {/* <InfoWindow marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow> */}
                    </Map>
                </div>

            

        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCIH0f4QB94H3wrCkJBebxcTIJ7pU7pdZM")
})(MapContainer)


// const RouteMap = () => {
//     return( 
//         <Fragment>
//             <Header />
//             <SideNav />
//             <div className="body">
//                 <div className="route_map_container">
//                     <GoogleMap google={this.props.google} zoom={14}>

//                         <Marker onClick={this.onMarkerClick}
//                                 name={'Current location'} />

//                         <InfoWindow onClose={this.onInfoWindowClose}>
//                             <div>
//                             <h1>{this.state.selectedPlace.name}</h1>
//                             </div>
//                         </InfoWindow>
//                     </GoogleMap>
//                 </div>
//             </div>
//         </Fragment>
//     )
// };


//export default RouteMap;