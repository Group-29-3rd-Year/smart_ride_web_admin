import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import Axios from 'axios';
import React, { Fragment, useState ,Component, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Header from '../widget/header';
import SideNav from '../widget/sidenav';
import EditIcon from '@material-ui/icons/Edit';
import 'react-toastify/dist/ReactToastify.css';
import '../style/updateconductor.css';
import { Link } from 'react-router-dom';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

toast.configure();

    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);


      const useStyles = makeStyles({
        table: {
          minWidth: 590,
        },

        cell: {
            width: 150,
            height: 50,
        },

        cellActionHead: {
            width: 140,
            height: 50
        },

        cellAction: {
            width: 70,
            height: 50,
        },

        cellActionLink: {
            width: 70,
            height: 50,
        }
      });

const UpdateFare = () => {

    const [fareList, setFareList] = useState([]);
    const [fareprice, setFarePrice] = useState([]);
    //const [conListTwo, setConListTwo] = useState([]);

    async function getFares() {
        const res = await fetch("http://localhost:5000/fares");

        const fareArray = await res.json();

        setFareList(fareArray);
        setFarePrice(fareArray[0].fare_price);
        console.log(fareArray);

        
    };

    async function deleteFare(id) {
        console.log(id);
        try {
            const res = await fetch(`http://localhost:5000/fares/delete/${id}`, {
                method: "PUT"
            });

            const parseRes = await res.json();
            setFareList(fareList.filter(fare => fare.fare_id !== id));

            if(parseRes){
                //console.log(parseRes);
                //window.location.reload();
                toast.success("Deleted Successfully");
            }else{
                
                toast.error(parseRes)
            }

        } catch (err) {
            console.log(err.message);
        }
    }


    // async function getConductorsTwo() {
    //     const res_two = await fetch("http://localhost:5000/conductors/two");

    //     const conArrayTwo = await res_two.json();

    //     setConListTwo(conArrayTwo);
    //     console.log(conArrayTwo);

        
    // };

    useEffect(() => {
        getFares();
       // getConductorsTwo();
    }, []);
    
    const classes = useStyles();

    return(
        <Fragment>
            <div className="body">
                <Header />
                <SideNav />

                <div className="view_conductor_container">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className={classes.cell} align="center">Fare No</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Distance(km)</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Fare Rate(Rs.)</StyledTableCell>
                                    <StyledTableCell className={classes.cellActionHead} align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {fareList.map((row) => (
                                    <StyledTableRow key={row.fare_id}>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{row.fare_id}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.fare_km}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.fare_price}</StyledTableCell>
                                        <StyledTableCell className={classes.cellActionLink} align="center" ><Link style={{ color: '#00FF00' }} to={`updatesinglefare/${row.fare_id}`}><EditIcon /></Link></StyledTableCell>
                                        <StyledTableCell className={classes.cellAction} align="right"  height='5px' style={{ color: '#FF0000' }} onClick={() => { if (window.confirm('Are you sure to delete this ?')) deleteFare(row.fare_id) } } ><DeleteSweepIcon /></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                {/* {conListTwo.map((row) => (
                                    <StyledTableRow key={row.user_id}>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{row.user_name}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.phone_number}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.user_email}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">Not Assigned</StyledTableCell>
                                        <StyledTableCell className={classes.cellActionLink} align="center" ><Link style={{ color: '#00FF00' }} to={`updatesingleconductor/${row.user_id}`}><EditIcon /></Link></StyledTableCell>
                                    </StyledTableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Fragment>
    )
};

export default UpdateFare;