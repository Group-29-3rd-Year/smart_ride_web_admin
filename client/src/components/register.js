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

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = {name, phone_no, email, password};
            
            const response = await fetch("http://localhost:5000//smartride/register", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()

            console.log(parseRes);

        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <Fragment>
            <div className="body">
                <div className="backgroundImg"></div>
                <div className="form_container">
                    <h1>Register</h1>
                    <form onSubmit={onSubmitForm}>

                        <div className="form-row">
                            <div className="col-75">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Name"
                                    value={name}
                                    onChange = {e => onChange(e)}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-75">
                                <label>Phone No</label>
                                <input 
                                    type="text" 
                                    name="phone_no" 
                                    placeholder="Phone Number"
                                    value={phone_no}
                                    onChange = {e => onChange(e)}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-75">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    placeholder="Email"
                                    value={email}
                                    onChange = {e => onChange(e)}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-75">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Passwrod"
                                    value={password}
                                    onChange = {e => onChange(e)}
                                />
                            </div>
                        </div>

                        {/* <label>Re Type Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Retype Password"
                            value={password}
                            onChange = {e => onChange(e)}
                        /> */}
                        {/* <div className="form-row"> */}
                            <button type="submit" name="register">Register</button>
                        {/* </div> */}
                    </form>
                </div>
            </div>
        </Fragment>
    );
};


export default Register;