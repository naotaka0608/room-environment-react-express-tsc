import { useState, useEffect } from 'react';
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

function TableList() {

    const [sensors, setSensorData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sensors.length) : 0;

    useEffect(() => {
        const CreateSensor = async () => {
        axios.get("/api/sensors",{
            headers: { 
            'Content-Type': 'application/json',
            }})
            .then(res => {
            setSensorData(res.data.data);
            console.log(res.data.data);        
            }).catch(error => console.log(error))
        };

        CreateSensor();


    }, []);
  

    if (!sensors) return null;

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
   
      
    return (
        <div className="TableList">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">date</TableCell>
                            <TableCell align="left">temperature</TableCell>
                            <TableCell align="left">humidity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? sensors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : sensors
                        ).map((sensor:any, index : any) => (
                            <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {sensor.date}
                            </TableCell>
                            <TableCell style={{ width: 200 }} align="left">
                                {sensor.temperature}
                            </TableCell>
                            <TableCell style={{ width: 200 }} align="left">
                                {sensor.humidity}
                            </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sensors.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );      

}

export default TableList;