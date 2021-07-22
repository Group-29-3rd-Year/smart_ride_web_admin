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
    const[busNewStart, setNewBusStart] = useState([]);
    const[busNewEnd, setNewBusEnd] = useState([]);
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

            setPrevBusEndName(bus_end[0].halt_name);

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
        // start: "",
        // end: ""
        
    });

   const {number} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    };

    const startChange = (event) => {
        setNewBusStart(event.target.value);
    };

    const endChange = (event) => {
        setNewBusEnd(event.target.value);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = {number, busNewStart, busNewEnd};
            console.log(props.match.params.id)
            console.log(number);
            console.log(busNewStart);
            console.log(busNewEnd);
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
                                <Select 
                                    className={classes.selectEmpty}
                                    value={busNewStart}
                                    onChange = {startChange}
                                    required
                                >
                                    <MenuItem value={busPrevStart}><em>{busPrevStart}{' - '}{busPrevStartName}</em></MenuItem>
                                    {haltList.map((halt1) => ( 
                                    <MenuItem value={halt1.halt_id}>{halt1.halt_id}{' - '}{halt1.halt_name}</MenuItem>
                                    ))}
                                </Select>
                               
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Route End</label>
                                <Select 
                                    className={classes.selectEmpty}
                                    value={busNewEnd}
                                    onChange = {endChange}
                                    required
                                >
                                    <MenuItem value={busPrevEnd}><em>{busPrevEnd}{' - '}{busPrevEndName}</em></MenuItem>
                                    {haltList.map((halt2) => (
                                    <MenuItem value={halt2.halt_id}>{halt2.halt_id}{' - '}{halt2.halt_name}</MenuItem>
                                    ))}
                                </Select>
                                
                            </div>
                        </div>

                        <div className="btn_box">
                            <button className="bus_update_btn">Update</button>
                        </div>
                        
                        
                    </form>
                        
                    </div>
                {/* </Grid> */}
                
            </div>
        </Fragment>
    );
};

export default withRouter(UpdateSingleBus);