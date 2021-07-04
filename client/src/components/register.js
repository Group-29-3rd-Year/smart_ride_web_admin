import React, {Fragment, useState} from 'react';
import './style/register.css';


const Register = () => {

    const [inputs, setInputs] = useState({
         name: "",
         phone_no: "",
         email: "",
         password: ""
    });

    const {name, phone_no, email, password} = inputs;

    return(
        <Fragment>
            <div className="body">
                <div className="backgroundImg"></div>
                <div className="form_container">
                    <h1>Register</h1>
                    <form>
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name"
                            value={name}
                        />

                        <label>Phone No</label>
                        <input 
                            type="text" 
                            name="phone_no" 
                            placeholder="Phone Number"
                            value={phone_no}
                        />

                        <label>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Email"
                            value={email}
                        />

                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Passwrod"
                            value={password}
                        />

                        <label>Re Type Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Retype Password"
                            value={password}
                        />
                    </form>

                    <button type="submit" name="register">Register</button>
                </div>
            </div>
        </Fragment>
    );
};


export default Register;