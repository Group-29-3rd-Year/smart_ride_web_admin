import React, {Fragment, useState} from 'react';
import './style/login.css';

const Login = ({ setAuth }) => {

//     const [inputs] = useState({
//         email: "",
//         password: ""
//    });

//     const {email, password} = inputs;

    
    return(
        <Fragment>
            <div className="body">
                <div className="backgroundImg"></div>
                <div className="form_container">
                    <h1>Login</h1>
                    <form >
                        <div className="form-row">
                            <div className="col-75">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    placeholder="enter email"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-75">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="enter passwrod"
                                />
                            </div>
                        </div>
                        
                        {/* <div className="button"> */}
                        <center>
                            <button onClick={() => setAuth(true)}>Login</button>
                        </center>
                            
                        {/* </div> */}
                    </form>
                </div>
            </div>
            
        </Fragment>
    );
};


export default Login;