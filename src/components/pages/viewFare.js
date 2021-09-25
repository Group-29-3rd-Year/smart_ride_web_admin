import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import React, { Fragment, useState ,Component, useEffect} from 'react';
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
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import '../style/viewfare.css';

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
            width: 200,
            height: 50
        },

      });

const ViewFare = () => {

    const [fareList, setFareList] = useState([]);

    async function getFares() {
        const res = await fetch("https://smartride-backend.herokuapp.com/admin/fares");
  
        const fareArray = await res.json();
  
        setFareList(fareArray);

    }
  
      useEffect(() => {
        getFares();
      }, []);
  
      //console.log(haltList);

    const classes = useStyles();

    return(
        <Fragment>
            <div className="body">
                <Header />
                <SideNav />
                    <div className="view_halt_container">
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell className={classes.cell} align="center">Fare No</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">Distance(km)</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">Fare Rate</StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                    <TableBody>
                                            {fareList.map((row) => (
                                                <StyledTableRow key={row.fare_id}>
                                                    <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{row.fare_id}</StyledTableCell>
                                                    <StyledTableCell className={classes.cell} align="center">{row.fare_km}</StyledTableCell>
                                                    <StyledTableCell className={classes.cell} align="center">{row.fare_price}</StyledTableCell>
                                                    
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

export default ViewFare;