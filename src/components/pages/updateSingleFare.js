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


const UpdateSingleFare = (props) => {

    //const [busList, setBusList] = useState([]);
    const [fareKm, setFareKm] = useState([]);
    const [farePrice, setFarePrice] = useState([]);
    const[fareNewPrice, setNewFarePrice] = useState([]);
    console.log(props.match.params.id);


    async function getFareDetails() {
        const det = await fetch(`https://smartride-backend.herokuapp.com/admin/fares/getsinglefare/${props.match.params.id}`);

        const fareArray = await det.json();

        setFareKm(fareArray[0].fare_km);
        setFarePrice(fareArray[0].fare_price);

    };

    console.log(fareKm);
    console.log(farePrice);
  
    const priceChange = (event) => {
        setNewFarePrice(event.target.value);
    };
   

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = {fareNewPrice};
            console.log(fareNewPrice);
            const response = await fetch(`https://smartride-backend.herokuapp.com/admin/fares/update/${props.match.params.id}`, {
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
       // getBusses();
        getFareDetails()
    }, []);

   const classes = useStyles();

    return (
        <Fragment>
            <div className="body">
                    <Header />
                    <SideNav />
                
                <div className="update_con_container">
                    <h2>Update Fare Rates</h2>
                    <form onSubmit={onSubmitForm}>
                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Distance</label>
                                <input 
                                    type="text" 
                                    name="fare_km"
                                    //id={number} 
                                    //placeholder="Bus No"
                                    value={fareKm}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Fare Rate</label>
                                <input 
                                    type="text" 
                                    name="fare_price"
                                    placeholder="Fare Rate"
                                    value={fareNewPrice}
                                    //defaultValue={busPrevName}
                                    onChange = {priceChange}
                                    required
                                />
                                
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

export default UpdateSingleFare;