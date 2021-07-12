import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import React, { Fragment, useState } from 'react';
import Header from '../widget/header';
import SideNav from '../widget/sidenav';
import '../style/addbus.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const AddBus = () => {

    const [inputs, setInputs] = useState({
        number: "",
        start: "",
        end: "",
    });

   const {number, start, end} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = {number, start, end};
            
            const response = await fetch("http://localhost:5000/busses/add", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()

            if(parseRes){
                //console.log(parseRes);
                window.location.reload();
                toast.success("Registered Successfully");
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

                    <div className="add_bus_container">
                    <h2>Bus Register</h2>
                    <form onSubmit={onSubmitForm}>
                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Bus No</label>
                                <input 
                                    type="text" 
                                    name="number" 
                                    placeholder="Bus No"
                                    value={number}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Route Start</label>
                                <input 
                                    type="text" 
                                    name="start" 
                                    placeholder="Route Start"
                                    value={start}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Route End</label>
                                <input 
                                    type="text" 
                                    name="end" 
                                    placeholder="Route End"
                                    value={end}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <button>Register</button>
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

export default AddBus;