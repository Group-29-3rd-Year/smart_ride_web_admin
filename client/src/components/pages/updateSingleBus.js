import { toast } from 'react-toastify';
import React, { Fragment, useState ,Component , useEffect} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SideNav from '../widget/sidenav';
import Header from '../widget/header';

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

const UpdateSingleBus = (props) => {

    const [haltList, setHaltList] = useState([]);

    async function getHalts() {
        const res = await fetch("http://localhost:5000/halts");
  
        const haltArray = await res.json();
  
        setHaltList(haltArray);
  
        console.log(haltArray);
    }

    // prefill values
    const[busPrevName, setPrevBusName] = useState([]);
    const[busPrevStart, setPrevBusStart] = useState([]);
    const[busPrevEnd, setPrevBusEnd] = useState([]);
    const[busPrevStartName, setPrevBusStartName] = useState([]);
    const[busPrevEndName, setPrevBusEndName] = useState([]);
    //console.log(props.match.params.id);
    //let bus = [];
    
    async function getBus() {
        const res = await fetch(`http://localhost:5000/busses/singlebus/${props.match.params.id}`);
  
        const bus = await res.json();
  
        //console.log(props.match.params.id);
        setPrevBusName(bus[0].bus_number);
        setPrevBusStart(bus[0].route_start);
        setPrevBusEnd(bus[0].route_end);
  

        
    };

        async function getStartHalt() {
            const res_start = await fetch(`http://localhost:5000/halts/${busPrevStart}`);
            const bus_start = await res_start.json();

            setPrevBusStartName(bus_start[0].halt_name);

            //console.log(bus_start[0].halt_name);
        };

        async function getEndHalt() {
            const res_end = await fetch(`http://localhost:5000/halts/${busPrevEnd}`);
            const bus_end = await res_end.json();

            setPrevBusStartName(bus_end[0].halt_name);

            //console.log(bus_end[0].halt_name);
        }

        console.log(busPrevName);
        console.log(busPrevStartName);
        console.log(busPrevEndName);

    useEffect(() => {
        getBus();
        getHalts();
        getStartHalt();
        getEndHalt();
    }, []);


    // update values
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
            // console.log(props.match.params.id)
            // console.log(number);
            // console.log(start);
            // console.log(end);
            const response = await fetch(`http://localhost:5000/busses/update/${props.match.params.id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()

            if(parseRes){
                //console.log(parseRes);
                window.location.reload();
                toast.success("Updated Successfully");
                
            }else{
                
                toast.error(parseRes)
            }
            

        } catch (err) {
            console.error(err.message);
        }
    }

    const classes = useStyles();

    return(

        <Fragment>
            <div className="body">
                
                    <Header />
                    <SideNav />

                    <div className="add_bus_container">
                    <h2>Update</h2>
                    <form onSubmit={onSubmitForm}>
                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Bus No</label>
                                <input 
                                    type="text" 
                                    name="number"
                                    id={number} 
                                    placeholder="Bus No"
                                    //value={number}
                                    defaultValue={busPrevName}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Route Start</label>
                                <Select className={classes.selectEmpty}>
                                    <MenuItem value={busPrevStart}><em>{busPrevStart}{'-'}{busPrevStartName}</em></MenuItem>
                                    {haltList.map((halt1) => ( 
                                    <MenuItem name={start} value={halt1.halt_id}>{halt1.halt_name}</MenuItem>
                                    ))}
                                </Select>
                                {/* <input 
                                    type="number" 
                                    name="start" 
                                    id={start} 
                                    placeholder="Route Start"
                                    //value={busStart}
                                    defaultValue={busPrevStart}
                                    onChange = {e => onChange(e)}
                                    required
                                /> */}
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Route End</label>
                                {/* <Select className={classes.selectEmpty}>
                                    <MenuItem value="0"><em>None</em></MenuItem>
                                    {haltList.map((halt2) => (
                                    <MenuItem name={end} value={halt2.halt_id}>{halt2.halt_name}</MenuItem>
                                    ))}
                                </Select> */}
                                <input 
                                    type="number" 
                                    name="end" 
                                    id={end} 
                                    placeholder="Route End"
                                    //value={end}
                                    defaultValue={busPrevEnd}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <button>Update</button>
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

export default withRouter(UpdateSingleBus);