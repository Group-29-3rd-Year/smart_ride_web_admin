import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import React, { Fragment, useState } from 'react';
import Header from '../widget/header';
import SideNav from '../widget/sidenav';
import '../style/addhalt.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const AddHalt = () => {

    const [inputs, setInputs] = useState({
        halt_name: "",
    });

    const {halt_name} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = {halt_name};
            
            const response = await fetch("http://localhost:5000/halts/add", {
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

                    <div className="add_halt_container">
                    <h2>Add Halt</h2>
                    <form onSubmit={onSubmitForm}>
                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Halt Name</label>
                                <input 
                                    type="text" 
                                    name="halt_name" 
                                    placeholder="Halt Name"
                                    value={halt_name}
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

export default AddHalt;