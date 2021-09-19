import { toast } from 'react-toastify';
import React, { Fragment, useState ,Component , useEffect} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SideNav from '../widget/sidenav';
import Header from '../widget/header';
import '../style/profile.css';
import jwt_decode from "jwt-decode";


const Profile = (props) => {

    const[prevName, setPrevName] = useState([]);
    const[prevNumber, setPrevNumber] = useState([]);
    const[prevEmail, setPrevEmail] = useState([]);

    var id = localStorage.getItem('token');
    console.log(id);
    var userId = jwt_decode(id);
    console.log(userId['user']['user']);

    var adminId = userId['user']['user'];

    const body = {adminId};

    async function getData() {
        const res = await fetch("http://localhost:5000/admin/smartride/getdata", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        });
  
        const dataArray = await res.json();
  
        setPrevName(dataArray['user_name']);
        setPrevNumber(dataArray['phone_number']);
        setPrevEmail(dataArray['user_email']);
    }




    useEffect(() => {
        getData();
    }, []);

    return(

        <Fragment>
            <div className="body">

                <Header />
                <SideNav />

                <div className="profile_container">
                    <h2>Profile</h2>

                    <form >
                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Name"
                                    //value={number}
                                    defaultValue={prevName}
                                    //onChange = {e => onChange(e)}
                                    required
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Phone Number</label>
                                <input 
                                    type="text" 
                                    name="number"
                                    placeholder="Number"
                                    //value={number}
                                    defaultValue={prevNumber}
                                    //onChange = {e => onChange(e)}
                                    required
                                    readOnly
                                />
                               
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="email"
                                    placeholder="Email"
                                    //value={number}
                                    defaultValue={prevEmail}
                                    //onChange = {e => onChange(e)}
                                    required
                                    readOnly
                                />
                                
                            </div>
                        </div>

                       
                        
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile;