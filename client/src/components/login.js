import React, {Fragment, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './style/login.css';

const useStyles = makeStyles((theme) => ({
    
    submit: {
      width: '140px',
      height: '40px'
    },
}));

const Login = ({ setAuth }) => {
    
    const classes = useStyles();

//     const [inputs] = useState({
//         email: "",
//         password: ""
//    });

//     const {email, password} = inputs;

    
    return(
        <Fragment>
            <div className="body">
                <div className="backgroundImg"></div>
                <div className="f_container">
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
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => setAuth(true)}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};


export default Login;