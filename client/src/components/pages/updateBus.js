import { Button, Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import React, { Fragment, useState ,Component , useEffect} from 'react';
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
import '../style/updatebus.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import updateSingleBus from './updateSingleBus';
import { Link } from 'react-router-dom';

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
          minWidth: 720,
        },

        cell: {
            width: 150,
            height: 50
        },

        cellActionHead: {
            width: 120,
            height: 50
        },

        cellAction: {
            width: 60,
            height: 50,
            align: "left",
            cursor: "pointer"
        },

        cellActionLink: {
            width: 60,
            height: 50,
            align: "left",
            cursor: "pointer",
            color: 'balck'
        }

    });


const UpdateBus = () => {

    const [busList, setBusList] = useState([]);

    async function getBusses() {
      const res = await fetch("http://localhost:5000/busses");

      const busArray = await res.json();

      setBusList(busArray);

      //console.log(busArray);
    }

    async function deleteBus(id) {
        console.log(id);
        try {
            const res = await fetch(`http://localhost:5000/busses/delete/${id}`, {
                method: "PUT"
            });

            const parseRes = await res.json();
            setBusList(busList.filter(bus => bus.bus_id !== id));

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
      getBusses();
    }, []);

    console.log(busList);

    // /* dummy data */
    // function createData(bus_no, route_start, route_end, conductor) {
    //     return { bus_no, route_start, route_end, conductor };
    // }
    
    // const rows = [
    //     createData('NP-6566', 'Galle','Wackwella', 1),
    //     createData('NQ-4235', 'Galle', 'Hikkaduwa', 2),
    //     createData('NQ-2211', 'Elpitiya', 'Karapitiye', 4),
    //     createData('NP-6063', 'Rathgama' , 'Hikkaduwa', 3),
    //     createData('NQ-4411', 'Dodangoda', 'Galle' , 5),
    // ];

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
                                    <StyledTableCell className={classes.cellActionHead} align="center">Action</StyledTableCell>
                                    {/* <StyledTableCell className={classes.cellActionHead} align="center"></StyledTableCell> */}
                                    {/* <StyledTableCell className={classes.cell} align="center">Delete</StyledTableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {busList.map((row) => (
                                    <StyledTableRow key={row.bus_id}>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{row.bus_number}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.route_start}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.route_end}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.conductor_id == null || '0' ? "Not Assigned" : row.conductor_id}</StyledTableCell>
                                        <StyledTableCell className={classes.cellActionLink} align="center" ><Link style={{ color: '#00FF00' }} to={`updatesinglebus/${row.bus_id}`}><EditIcon /></Link></StyledTableCell>
                                        <StyledTableCell className={classes.cellAction} align="right"  height='5px' style={{ color: '#FF0000' }} onClick={() => deleteBus(row.bus_id)}><DeleteSweepIcon /></StyledTableCell>
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

export default UpdateBus;
