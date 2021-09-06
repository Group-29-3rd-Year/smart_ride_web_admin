import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import React, { Fragment, useState ,useEffect} from 'react';
import Header from '../widget/header';
import SideNav from '../widget/sidenav';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import '../style/addbus.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

    const useStyles = makeStyles((theme) => ({
        selectEmpty: {
            marginTop: theme.spacing(1),
            width: 200,
            display: 'flex',
            flexWrap: 'wrap',
        },
        list: {
            display: 'inline',
            margin: 2,
        }
    }));

const AddBus = () => {

    // get Halt list from db
    const [haltList, setHaltList] = useState([]);

    async function getHalts() {
        const res = await fetch("http://localhost:5000/admin/halts");
  
        const haltArray = await res.json();
  
        setHaltList(haltArray);
  
        console.log(haltArray);
    }

    //define inputs and db fetch
    const [inputs, setInputs] = useState({
        number: "",
        // start: "",
        // end: "",
    });

    const [start, setStart] = useState({});
    const [end, setEnd] = useState({});
    

   const {number} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    };

    const startChange = (event) => {
        setStart(event.target.value);
    };

    const endChange = (event) => {
        setEnd(event.target.value);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = {number, start, end};
            console.log(number);
            console.log(start);
            console.log(end);
            const response = await fetch("http://localhost:5000/admin/busses/add", {
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

    useEffect(() => {
        getHalts();
    }, []);

    const classes = useStyles();

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
                                {/* <input 
                                    type="number" 
                                    name="start" 
                                    placeholder="Route Start"
                                    value={start}
                                    onChange = {e => onChange(e)}
                                    required
                                /> */}
                                <Select 
                                    className={classes.selectEmpty}
                                    value={start}
                                    onChange = {startChange}
                                    required
                                >
                                    <MenuItem className={classes.list} value="0"><em>None</em></MenuItem>
                                    {haltList.map((halt1) => ( 
                                    <MenuItem className={classes.list} name={start} value={halt1.halt_id}>{halt1.halt_id}{" - "}{halt1.halt_name}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Route End</label>
                                {/* <input 
                                    type="number" 
                                    name="end" 
                                    placeholder="Route End"
                                    value={end}
                                    onChange = {e => onChange(e)}
                                    required
                                /> */}
                                <Select 
                                    className={classes.selectEmpty}
                                    value={end}
                                    onChange = {endChange}
                                    required
                                >
                                    <MenuItem value="0"><em>None</em></MenuItem>
                                    {haltList.map((halt2) => ( 
                                    <MenuItem  value={halt2.halt_id}>{halt2.halt_id}{" - "}{halt2.halt_name}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <div className="btn_box">
                            <button className="bus_update_btn">Register</button>
                        </div>
                        
                        
                    </form>
                        
                    </div>
                {/* </Grid> */}
                
            </div>
        </Fragment>
    );
};

export default AddBus;