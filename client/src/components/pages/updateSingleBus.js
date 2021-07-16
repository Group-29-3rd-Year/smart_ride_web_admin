import { toast } from 'react-toastify';
import React, { Fragment, useState ,Component , useEffect} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect, withRouter } from 'react-router-dom';
import SideNav from '../widget/sidenav';
import Header from '../widget/header';

toast.configure();

const UpdateSingleBus = (props) => {

    // const [haltList, setHaltList] = useState([]);

    // async function getHalts() {
    //     const res = await fetch("http://localhost:5000/halts");
  
    //     const haltArray = await res.json();
  
    //     setHaltList(haltArray);
  
    //     console.log(haltArray);
    // }

    // prefill values
    const[busName, setBusName] = useState([]);
    const[busStart, setBusStart] = useState([]);
    const[busEnd, setBusEnd] = useState([]);
    //console.log(props.match.params.id);
    //let bus = [];
    
    async function getBus() {
        const res = await fetch(`http://localhost:5000/busses/singlebus/${props.match.params.id}`);
  
        const bus = await res.json();
  
        setBusName(bus[0].bus_number);
        setBusStart(bus[0].route_start);
        setBusEnd(bus[0].route_end);
  
        console.log(bus[0].bus_number);
        console.log(bus[0].route_start);
        console.log(bus[0].route_end);
    }

    useEffect(() => {
        getBus();
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
            console.log(props.match.params.id)
            console.log(number);
            console.log(start);
            console.log(end);
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
                                    defaultValue={busName}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Route Start</label>
                                {/* <Select className={classes.selectEmpty}>
                                    <MenuItem value="0"><em>None</em></MenuItem>
                                    {haltList.map((halt1) => ( 
                                    <MenuItem name={start} value={halt1.halt_id}>{halt1.halt_name}</MenuItem>
                                    ))}
                                </Select> */}
                                <input 
                                    type="text" 
                                    name="start" 
                                    id={start} 
                                    placeholder="Route Start"
                                    //value={busStart}
                                    defaultValue={busStart}
                                    onChange = {e => onChange(e)}
                                    required
                                />
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
                                    type="text" 
                                    name="end" 
                                    id={end} 
                                    placeholder="Route End"
                                    //value={end}
                                    defaultValue={busEnd}
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
    )
};

export default withRouter(UpdateSingleBus);