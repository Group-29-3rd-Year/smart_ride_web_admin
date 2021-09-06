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
import '../style/viewhalt.css';

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
          minWidth: 500,
        },

        cell: {
            width: 200,
            height: 50
        },

        cellAction: {
            width: 100,
            height: 50,
            //align: "center",
            cursor: "pointer",
        }
      });

const ViewHalt = () => {

    // function createData(halt_id, halt_name) {
    //     return { halt_id, halt_name };
    // }
    
    // const rows = [
    //     createData( 1,'Galle'),
    //     createData( 2,'Kalegana'),
    //     createData( 3,'Elpitiya'),
    //     createData( 4,'Rathgama' ),
    //     createData( 5,'Dodangoda'),
    // ];

    const [haltList, setHaltList] = useState([]);

    async function getHalts() {
        const res = await fetch("http://localhost:5000/admin/halts");
  
        const haltArray = await res.json();
  
        setHaltList(haltArray);

    }

    async function deleteHalt(id) {
        try {
            const res = await fetch(`http://localhost:5000/admin/halts/delete/${id}`, {
                method: "PUT"
            });

            
            const parseRes = await res.json();
            setHaltList(haltList.filter(halt => halt.halt_id !== id));

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
  
      useEffect(() => {
        getHalts();
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
                                        <StyledTableCell className={classes.cell} align="center">Halt No</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">Name</StyledTableCell>
                                        <StyledTableCell className={classes.cellAction}>Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                    <TableBody>
                                            {haltList.map((row) => (
                                                <StyledTableRow key={row.halt_id}>
                                                    <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{row.halt_id}</StyledTableCell>
                                                    <StyledTableCell className={classes.cell} align="center">{row.halt_name}</StyledTableCell>
                                                    <StyledTableCell className={classes.cellAction}  align="right"  height='5px' style={{ color: '#FF0000' }} onClick={() => { if (window.confirm('Are you sure to delete this ?')) deleteHalt(row.halt_id) } }><DeleteSweepIcon /></StyledTableCell>
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