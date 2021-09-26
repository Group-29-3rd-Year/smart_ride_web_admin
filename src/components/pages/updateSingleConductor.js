import { toast } from 'react-toastify';
import React, { Fragment, useState ,Component , useEffect} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SideNav from '../widget/sidenav';
import Header from '../widget/header';
import '../style/updatesinglecon.css';

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


const UpdateSingleConductor = (props) => {

    const [busList, setBusList] = useState([]);
    const [conName, setConName] = useState([]);
    const [conEmail, setConEmail] = useState([]);
    const [conPhoneNo, setConPhoneNo] = useState([]);
    console.log(props.match.params.id);

    async function getBusses() {
        const res = await fetch("http://localhost:5000/admin/conductors/getbusses");
  
        const busArray = await res.json();
  
        setBusList(busArray);
  
        console.log(busArray);
    };


    async function getConDetails() {
        const det = await fetch(`http://localhost:5000/admin/conductors/getsinglecon/${props.match.params.id}`);

        const conArray = await det.json();

        setConName(conArray[0].user_name);
        setConEmail(conArray[0].user_email);
        setConPhoneNo(conArray[0].phone_number);
        //console.log(conArray[0]);
    };

    console.log(conName);
    console.log(conEmail);
    console.log(conPhoneNo);

    const [busNo, setBusNo] = useState({});

    const addBus = (event) => {
        setBusNo(event.target.value);
    };


    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = {busNo};
            console.log(busNo);
            const response = await fetch(`http://localhost:5000/admin/conductors/update/${props.match.params.id}`, {
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

    useEffect(() => {
        getBusses();
        getConDetails()
    }, []);

    const classes = useStyles();

    return (
        <Fragment>
            <div className="body">
                    <Header />
                    <SideNav />
                
                <div className="update_con_container">
                    <h2>Update Conductor</h2>
                    <form onSubmit={onSubmitForm}>
                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    //id={number} 
                                    //placeholder="Bus No"
                                    value={conName}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="email"
                                    //id={number} 
                                    //placeholder="Bus No"
                                    value={conEmail}
                                    //defaultValue={busPrevName}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Phone Number</label>
                                <input 
                                    type="text" 
                                    name="phone_number"
                                    //id={number} 
                                    //placeholder="Bus No"
                                    value={conPhoneNo}
                                    //defaultValue={busPrevName}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Bus No</label>
                                
                                <Select 
                                    className={classes.selectEmpty}
                                    value={busNo}
                                    onChange={addBus}
                                    required
                                >
                                    <MenuItem className={classes.list} value="0"><em>None</em></MenuItem>
                                    {busList.map((bus) => ( 
                                    <MenuItem className={classes.list} value={bus.bus_id}>{bus.bus_number}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <div className="btn_box">
                            <button className="bus_update_btn">Update</button>
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    );

}

export default UpdateSingleConductor;