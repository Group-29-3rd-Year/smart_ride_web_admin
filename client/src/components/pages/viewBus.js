import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import React, { Fragment, useState ,Component } from 'react';
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
import '../style/viewbus.css';

toast.configure();

    //const body = {bus_number, r_start, r_end, conductor_id};
    function createData(bus_no, route_start, route_end, conductor) {
        return { bus_no, route_start, route_end, conductor };
      }
      
      const rows = [
        createData('NP-6566', 'Galle','Wackwella', 1),
        createData('NQ-4235', 'Galle', 'Hikkaduwa', 2),
        createData('NQ-2211', 'Elpitiya', 'Karapitiye', 4),
        createData('NP-6063', 'Rathgama' , 'Hikkaduwa', 3),
        createData('NQ-4411', 'Dodangoda', 'Galle' , 5),
      ];

    // const busses = fetch("http://localhost:5000/busses", {
    //             method: "GET",
    //             headers: {"Content-Type" : "application/json"},
    //             body: JSON.stringify(body)
    //         });

    // let bus = [];
    // for(let i = 0; i < bus.length; i++) {
    //     bus[i] = {
    //         bus_number: busses.bus_number,
    //         r_start: busses.r_start,
    //         r_end: busses.r_end,
    //         conductor_id: busses.conductor_id

    //     }
    // }

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
          minWidth: 700,
        },

        cell: {
            width: 175,
        }
      });

const ViewBus = () => {

    const classes = useStyles();

    return(
        <Fragment>
            <div className="body">
                <Header />
                <SideNav />

                <div className="view_bus_container">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className={classes.cell} align="center">Bus No</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Route Start</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Route End</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Conductor</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.bus_no}>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{row.bus_no}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.route_start}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.route_end}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.conductor}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Fragment>
    );
};


export default ViewBus;