import { toast } from 'react-toastify';
import React, { Fragment, useState ,Component , useEffect} from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import SideNav from '../widget/sidenav';
import Header from '../widget/header';

toast.configure();

const UpdateSingleBus = (props) => {

    // prefill values
    const[busData, setBusData] = useState([]);
    console.log(props.match.params.id);
    //let bus = [];
    
    async function getBus() {
        const res = await fetch(`http://localhost:5000/busses/singlebus/${props.match.params.id}`);
  
        const bus = await res.json();
  
        setBusData(bus);
  
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
                                    placeholder="Bus No"
                                    value={busData.bus_number}
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
                                    value={busData.route_start}
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
                                    value={busData.route_end}
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