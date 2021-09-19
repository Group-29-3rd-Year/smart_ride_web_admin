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
import { Bar, defaults } from 'react-chartjs-2'
import '../style/chart.css';
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
          maxWidth: 1000,
        },

        cell: {
            width: 200,
            height: 50
        },
      });

    


const Chart = () => {

  const [reaspascount, setReagPascount] = useState([]);
  const [buscount, setBuscount] = useState([]);
  const [conductorcount, setConductorcount] = useState([]);
  const [todayincome, setTodayincome] = useState([]);
  const [monthlyincome, setMonthlyincome] = useState([]);
  const [passengercount, setPassengercount] = useState([]);
  const [haltcount, setHaltcount] = useState([]);
  const [usercount, setUsercount] = useState([]);
  const [routescount, setRoutescount] = useState([]);

  async function getRegisterPassengerss() {
    const res = await fetch("http://localhost:5000/admin/stat/regpascount");

    const regpas = await res.json();

      setReagPascount(regpas);
      console.log(regpas);
     
  };      
    
  async function getBusses() {
    const res = await fetch("http://localhost:5000/admin/stat/buscount");

    const busArray = await res.json();

      setBuscount(busArray);
      console.log(busArray);
     
  };


  async function getConductors() {
    const res = await fetch("http://localhost:5000/admin/stat/conductorcount");

    const conductorArray = await res.json();

      setConductorcount(conductorArray);
      console.log(conductorArray);
     
  };
 

  async function getTodayincome() {
    const res = await fetch("http://localhost:5000/admin/stat/todayincome");

    const todayincomeArray = await res.json();

      setTodayincome(todayincomeArray);
      console.log(todayincomeArray);
     
  };


  async function getMonthlyincome() {
    const res = await fetch("http://localhost:5000/admin/stat/monthlyincome");

    const monthlyincomeArray = await res.json();

      setMonthlyincome(monthlyincomeArray);
      console.log(monthlyincomeArray);
     
  };

  async function getPassengercount() {
    const res = await fetch("http://localhost:5000/admin/stat/passengercount");

    const passengercountArray = await res.json();

      setPassengercount(passengercountArray);
      console.log(passengercountArray);
     
  };

  async function getHaltcount() {
    const res = await fetch("http://localhost:5000/admin/stat/haltcount");

    const haltcountArray = await res.json();

      setHaltcount(haltcountArray);
      console.log(haltcountArray);
     
  };

  async function getUsercount() {
    const res = await fetch("http://localhost:5000/admin/stat/usercount");

    const usercountArray = await res.json();

      setUsercount(usercountArray);
      console.log(usercountArray);
     
  };

  async function getRoutescount() {
    const res = await fetch("http://localhost:5000/admin/stat/routescount");

    const routescountArray = await res.json();

      setRoutescount(routescountArray);
      console.log(routescountArray);
     
  };



  useEffect(() => {
    getConductors();
    getBusses();
    getTodayincome();
    getMonthlyincome();
    getPassengercount();
    getHaltcount();
    getUsercount();
    getRoutescount();
    getRegisterPassengerss();
    
  }, []);


  const classes = useStyles();


  return (
    <Fragment>
    <div className="body" >
        {/* <Grid> */}
            <Header />
        {/* </Grid> */}
        {/* <Grid> */}
            <SideNav />
        {/* </Grid> */}
        {/* <Grid> */}

        <div className="chart_container">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className={classes.cell} align="center">Bus Count</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Conductor Count</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Registered Passengers</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Today Income</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Month Income</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <StyledTableRow >
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{buscount}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{conductorcount}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{reaspascount}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{todayincome}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{monthlyincome}</StyledTableCell>
                                        
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                                         
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                     

  <div className="chart">
   
    
      <Bar
        data={{
          labels: ['Total passengers', 'Total Halts', 'Total users', 'Total Routes'],
          datasets: [
            {
              label: 'Total counts for Today',
              data: [passengercount, haltcount, usercount, routescount],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
            // {
            //   label: 'Quantity',
            //   data: [47, 52, 67, 58, 9, 50],
            //   backgroundColor: 'orange',
            //   borderColor: 'red',
            // },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>  
    </div>
    
</Fragment>
  )
}

export default Chart;