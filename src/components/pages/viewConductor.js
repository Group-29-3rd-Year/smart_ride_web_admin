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
import 'react-toastify/dist/ReactToastify.css';
import '../style/viewconductor.css';

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
          maxWidth: 600,
        },

        cell: {
            width: 150,
        }
      });

const ViewConductor = () => {

    const [conList, setConList] = useState([]);
    const [conListTwo, setConListTwo] = useState([]);

    async function getConductors() {
        const res = await fetch("http://localhost:5000/admin/conductors");

        const conArray = await res.json();

        setConList(conArray);
        console.log(conArray);

        
    };

    async function getConductorsTwo() {
        const res_two = await fetch("http://localhost:5000/admin/conductors/two");

        const conArrayTwo = await res_two.json();

        setConListTwo(conArrayTwo);
        console.log(conArrayTwo);

        
    };

    useEffect(() => {
        getConductors();
        getConductorsTwo();
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
                                    <StyledTableCell className={classes.cell} align="center">Name</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Phone No</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Email</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Bus</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {conList.map((row) => (
                                    <StyledTableRow key={row.user_id}>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{row.user_name}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.phone_number}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.user_email}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.bus_number}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                {conListTwo.map((row) => (
                                    <StyledTableRow key={row.user_id}>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{row.user_name}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.phone_number}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.user_email}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">Not Assigned</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Fragment>
    )
};

export default ViewConductor;