import React, {useState} from "react";
import {Avatar, Button, Grid, Input, Paper, TextField, MenuItem, Select} from "@mui/material";
  import DeleteIcon from '@mui/icons-material/Delete';
  import SendIcon from '@mui/icons-material/Send';
  import Stack from '@mui/material/Stack';
  import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
  import InputLabel from "@mui/material/InputLabel";
  import FormControl from "@mui/material/FormControl";
  import { BASE_URL } from "../../../../../helper";
  
  function SignupPage() {

    const [inputVal, setInputVal] = useState({
      userName: "",
      userEmail: "",
      mobile: "",
      empId: "",
      designation: "",
      level: "",
      departmentName: "",
      departmentId: "",
      branchName: "",
      branchId: "",
      managerEmail: "",
      password: "",
      confirmPassword: "",
    });
  
    const onChangeHandler = (event) => {
      setInputVal((oldData) => {
        return { ...oldData, [event.target.name]: event.target.value };
      });
    };
  
    
  
    const postData = async (event) => {
      event.preventDefault();
      
      const {userName, userEmail, mobile, empId, designation, level, departmentName, departmentId, branchName, branchId, managerEmail, password} = inputVal
  
      const res = await fetch(`${BASE_URL}/empregdata`,{
          method:"POST",
          headers:{
              "content-type": "application/json"
          },
          body: JSON.stringify({
            userName, userEmail, mobile, empId, designation, level, departmentName, departmentId, branchName, branchId, managerEmail, password
          })
      });
  
      
      const data = await res.status;
      console.log( data)
  
      if(data === 200){
        alert("Registration Successful")
          console.log("Registration Successful")
        
       
      }else{
        alert("Invalid registration")
        console.log("Invalid registration")
          
      }
    };












    const designationArr = ["Executive", 'Sr. Executive', "Team Leader", "Manager", "Sr. Manager", "Branch Manager", "Consultant", "Director"]
    const branchArr = ["Bangalore Branch", 'Chennai Branch', "Delhi Branch", "Head Office", "   Hyderabad Branch", "Jaipur Branch", "Kolkata Branch", "Mumbai Branch", "Naraina Branch", "Pune Branch"]
    const levelArr = ["Level 1","Level 2","Level 3","Level 4","Level 5",]
    const branchIdArr = ["BLR","CHE","HO","HYD","JPR","KOL","MUM","NAR","DL","PUN"]
    const departmentArr = ["Accounts","Admin","Collections","Digital Marketing","HR","IT","Logitics","Marcom","Marketing","MIS","Sale","Web Developer"]
    const departmentIdArr = ["ACC","ADM","CLS","DMG","HR","IT","LGS","MCM","MKG","MIS","SLs","WB"]


    const paperStyle = {
      padding: 20,
      maxWidth: 480,
    };
    const avatarStyle = {
      backgroundColor: "#4b4a4a",
      margin: "25px 0px 15px 0px",
      width: "55px",
      height: "55px",
    };
    const lockOutStyle = {
      fontSize: "30px",
    };
    const inputStyle = { margin: "15px 0px 5px 0px" };  
    const btnStyle = { margin: "40px 0px 15px 0px" };
  
    return (
      <Grid className="newHelp">
        <Paper
          elevation={10}
          style={paperStyle}
          sx={{
            m: { xs: "60px auto 90px auto", sm: "85px auto 85px auto" },
            height: { xs: "142vh", sm: "140vh" },
          }}
        >
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon style={lockOutStyle} />
            </Avatar>
            <p style={{color: "#4b4a4a", fontSize: "25px", fontWeight: "500"}}>Sign Up</p>
          </Grid>
          <TextField
            variant="standard"
            id="userName"
            name="userName"
            label="Your Name"
            value={inputVal.userName}
            onChange={onChangeHandler}
            placeholder="Enter Your Name"
            fullWidth
            style={inputStyle}
          />
          <TextField
            variant="standard"
            id="userEmail"
            name="userEmail"
            label="Email"
            value={inputVal.userEmail}
            onChange={onChangeHandler}
            placeholder="Enter Your Email"
            fullWidth
            style={inputStyle}
          />
          <TextField
            variant="standard"
            id="mobile"
            name="mobile"
            label="Mobile"
            value={inputVal.mobile}
            onChange={onChangeHandler}
            placeholder="Enter Your Mobile Number"
            fullWidth
            style={inputStyle}
          />
          <TextField
            variant="standard"
            id="empId"
            name="empId"
            label="Employee Id"
            value={inputVal.empId}
            onChange={onChangeHandler}
            placeholder="Enter Your Employee Id"
            fullWidth
            style={inputStyle}
          />

            <FormControl variant="standard" fullWidth style={inputStyle}>
            <InputLabel id="demo-simple-select-standard-label" >Designation</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="designation"
                name="designation"
                label="Designation"
                value={inputVal.designation}
                onChange={onChangeHandler}
            >
                {designationArr.map(val => <MenuItem value={val} >{val}</MenuItem>)}
            </Select>
            </FormControl>

            <FormControl variant="standard" fullWidth style={inputStyle}>
            <InputLabel id="demo-simple-select-standard-label" >Level</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="level"
                name="level"
                label="Level"
                value={inputVal.level}
                onChange={onChangeHandler}
            >
                {levelArr.map(val => <MenuItem value={val} >{val}</MenuItem>)}
            </Select>
            </FormControl>


            <FormControl variant="standard" fullWidth style={inputStyle}>
            <InputLabel id="demo-simple-select-standard-label" >Department Name</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="departmentName"
                name="departmentName"
                label="Department Name"
                value={inputVal.departmentName}
                onChange={onChangeHandler}
            >
                {departmentArr.map(val => <MenuItem value={val} >{val}</MenuItem>)}
            </Select>
            </FormControl>

            <FormControl variant="standard" fullWidth style={inputStyle}>
            <InputLabel id="demo-simple-select-standard-label" >Department Id</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="departmentId"
                name="departmentId"
                label="Department Id"
                value={inputVal.departmentId}
                onChange={onChangeHandler}
            >
                {departmentIdArr.map(val => <MenuItem value={val} >{val}</MenuItem>)}
            </Select>
            </FormControl>


            <FormControl variant="standard" fullWidth style={inputStyle}>
            <InputLabel id="demo-simple-select-standard-label" >Branch Name</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="branchName"
                name="branchName"
                label="Branch Name"
                value={inputVal.branchName}
                onChange={onChangeHandler}
            >
                {branchArr.map(val => <MenuItem value={val} >{val}</MenuItem>)}
            </Select>
            </FormControl>



            <FormControl variant="standard" fullWidth style={inputStyle}>
            <InputLabel id="demo-simple-select-standard-label" >Branch Id</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="branchId"
                name="branchId"
                label="Branch Id"
                value={inputVal.branchId}
                onChange={onChangeHandler}
            >
                {branchIdArr.map(val => <MenuItem value={val} >{val}</MenuItem>)}
            </Select>
            </FormControl>

            <TextField
            variant="standard"
            id="managerEmail"
            name="managerEmail"
            label="Manager Email"
            value={inputVal.managerEmail}
            onChange={onChangeHandler}
            placeholder="Enter Your Manager's Email Id"
            fullWidth
            style={inputStyle}
          />


<TextField
            variant="standard"
            id="password"
            name="password"
            type="password"
            label="Password"
            value={inputVal.password}
            onChange={onChangeHandler}
            placeholder="Enter Your Password"
            fullWidth
            style={inputStyle}
          />

          <TextField
            variant="standard"
            id="confirmpassword"
            name="confirmPassword"
            label="Confirm Password"
            value={inputVal.confirmPassword}
            onChange={onChangeHandler}
            placeholder="Confirm Your Password"
            fullWidth
            style={inputStyle}
          />
     
          <Stack direction="row" spacing={4} style={btnStyle}>
          <Button variant="outlined" fullWidth type="reset" startIcon={<DeleteIcon />}>
            Reset
          </Button>
          <Button variant="contained" fullWidth  type="submit" onClick={postData} endIcon={<SendIcon />}>
            Submit
          </Button>
        </Stack>
  

     
        </Paper>
      </Grid>
    );
  }
  
  export default SignupPage;
  