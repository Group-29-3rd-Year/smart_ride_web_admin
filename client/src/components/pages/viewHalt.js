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
import '../style/viewhalt.css';

toast.configure();

    function createData(halt_id, halt_name) {
        return { halt_id, halt_name };
    }
    
    const rows = [
        createData( 1,'Galle'),
        createData( 2,'Kalegana'),
        createData( 3,'Elpitiya'),
        createData( 4,'Rathgama' ),
        createData( 5,'Dodangoda'),
    ];


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
          minWidth: 150,
        },

        cell: {
            width: 150,
        }
      });

const ViewHalt = () => {

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
                                    <StyledTableCell className={classes.cell} align="center">Halt No</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Name</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.halt_id}>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{row.halt_id}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.halt_name}</StyledTableCell>
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

export default ViewHalt;