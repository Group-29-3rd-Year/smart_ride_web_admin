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
import { Pie, defaults } from 'react-chartjs-2'
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
          maxWidth: 800,
        },

        cell: {
            width: 200,
            height: 50
        },
      });

    


const Chart = () => {

  
  const [buscount, setBuscount] = useState([]);
  const [conductorcount, setConductorcount] = useState([]);
  const [todayincome, setTodayincome] = useState([]);
  const [monthlyincome, setMonthlyincome] = useState([]);

        
    
  async function getBusses() {
    const res = await fetch("http://localhost:5000/admin/busses/buscount");

    const busArray = await res.json();

      setBuscount(busArray);
      console.log(busArray);
     
  };
  useEffect(() => {
    getBusses();
    
  }, []);

  async function getConductors() {
    const res = await fetch("http://localhost:5000/admin/stat/conductorcount");

    const conductorArray = await res.json();

      setConductorcount(conductorArray);
      console.log(conductorArray);
     
  };
  useEffect(() => {
    getConductors();
    
  }, []);

  async function getTodayincome() {
    const res = await fetch("http://localhost:5000/admin/stat/todayincome");

    const todayincomeArray = await res.json();

      setTodayincome(todayincomeArray);
      console.log(todayincomeArray);
     
  };
  useEffect(() => {
    getTodayincome();
    
  }, []);

  async function getMonthlyincome() {
    const res = await fetch("http://localhost:5000/admin/stat/monthlyincome");

    const monthlyincomeArray = await res.json();

      setMonthlyincome(monthlyincomeArray);
      console.log(monthlyincomeArray);
     
  };
  useEffect(() => {
    getMonthlyincome();
    
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
                                    <StyledTableCell className={classes.cell} align="center">Today Income</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Month Income</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <StyledTableRow >
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{buscount}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{conductorcount}</StyledTableCell>
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
                     

  <div className="chart_container2">
   
    
      <Pie
        data={{
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
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