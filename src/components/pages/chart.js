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

    


const Chart = () => {

  
  const [buscount, setBuscount] = useState([]);
        
    
  async function getBusses() {
    const res = await fetch("http://localhost:5000/admin/busses/buscount");

    const busArray = await res.json();

      setBuscount(busArray);
      console.log(busArray);
     
  };
  useEffect(() => {
    getBusses();
    
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

        <div className="view_bus_container">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className={classes.cell} align="center">Bus Count</StyledTableCell>
                                    </TableRow>
                            </TableHead>

                            <TableBody>
                               
                                    <StyledTableRow >
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{buscount}</StyledTableCell>
                                        </StyledTableRow>
                                         
                            </TableBody>
                           </Table>
                    </TableContainer>
                </div>
                                         
        

 {/* <div className="add_bus_container">
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
    </div>  */}
    </div>
</Fragment>
  )
}

export default Chart;