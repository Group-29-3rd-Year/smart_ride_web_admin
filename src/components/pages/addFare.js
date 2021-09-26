import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import React, { Fragment, useState } from 'react';
import Header from '../widget/header';
import SideNav from '../widget/sidenav';
import '../style/addfare.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const AddFare = () => {

    const [inputs, setInputs] = useState({
        fare_price: "", fare_km: ""
    });

    const {fare_price,fare_km} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = {fare_km,fare_price};
            console.log(fare_km);
            console.log(fare_price);
            
            const response = await fetch("http://localhost:5000/admin/fares/add", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()

            if(parseRes){
                //console.log(parseRes);
                window.location.reload();
                toast.success("Added Successfully");
            }else{
                
                toast.error(parseRes)
            }
            

        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <Fragment>
            <div className="body">
                {/* <Grid> */}
                    <Header />
                {/* </Grid> */}
                {/* <Grid> */}
                    <SideNav />
                {/* </Grid> */}
                {/* <Grid> */}

                    <div className="add_fare_container">
                    <h2>Add Fare</h2>
                    <form onSubmit={onSubmitForm}>
                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Distance</label>
                                <input 
                                    type="text" 
                                    name="fare_km" 
                                    placeholder="Distance(km)"
                                    value={fare_km}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Fare Rate</label>
                                <input 
                                    type="text" 
                                    name="fare_price" 
                                    placeholder="Fare Rate"
                                    value={fare_price}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>                        

                        <button>Add</button>
                        {/* <div className="login">
                            <h4><b>Have Account ?</b></h4>
                            <div className="login-link">
                                <Link to="/smartride/login" style={{ textDecoration: 'none', color: '#1e90ff' }} >Here</Link>
                            </div>
                        </div> */}
                    </form>
                    </div>
                {/* </Grid> */}
            </div>
        </Fragment>
    );

};

export default AddFare;