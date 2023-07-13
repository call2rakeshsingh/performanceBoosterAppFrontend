import React,{useState, useEffect} from 'react'
import { useValidateUser, BASE_URL, formatDate } from '../../helper';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import PiChart from './PiChart'
import BarChart from './BarChart';
import { sizing } from '@mui/system';


import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboards = () => {
  const navigate = useNavigate();
    useValidateUser();
    const [tableData, setTableData] = useState([])   
    const loginData = useSelector((store) => store.loginLogout.items)

    const callAllData = async () => {
    
      try {
        const respose = await fetch(`${BASE_URL}/checklistdashboard`,{
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
  
        const data = await respose.json();
       setTableData(data)
        
  
        if(respose.status !== 200) {
            console.log('This is erro message')
        }
  
      } 
      catch (error) {
        console.log("front end error in auth token")
      }
    }

  useEffect(() => {
    callAllData();
    },[])

  return <>
  { loginData.length > 0 ?
  (<>
    <Grid container spacing={2} style={{marginTop: "75px"}}>
    <Grid item xs={12} md={12} >
    <Box
      sx={{
        p: 2,
        // bgcolor: 'background.default',
        bgcolor: 'pink',
        display: 'grid',
        gridTemplateColumns: { md: '1fr 2fr' },
        gap: 5,
        boxSizing: 'content-box',
       
      }}

    >
    <Paper elevation={10} style={{boxSizing: 'content-box',  minHeight: '50vh'}}>
    <PiChart tableData={tableData} />
    </Paper>
    <Paper elevation={10}  style={{boxSizing: 'content-box', minHeight: '50vh'}}>
    <BarChart  tableData={tableData} />
    </Paper>
    </Box>
    </Grid>
    </Grid>
    <ToastContainer />
 

 
    </>
  ) : navigate("/login")
  }
    </>
}

export default Dashboards













