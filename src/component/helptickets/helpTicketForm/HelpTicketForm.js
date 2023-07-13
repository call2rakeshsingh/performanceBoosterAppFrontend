import React, {useState, useEffect} from "react";
import store from "../../../reduxStore/createStore";
import { useSelector } from "react-redux";
import {Avatar, Button, Grid, Paper, TextField, MenuItem, Select} from "@mui/material";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { useValidateUser, BASE_URL } from "../../../helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function HelpTicketForm() {
  const navigate = useNavigate();
  useValidateUser();
  const loginData = useSelector((store) => store.loginLogout.items)
  const notifySuccessful = () => toast.success('Helpticket submitted successfully!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const notifyFailed = () => toast.error('Helpticket Submission Failed!!!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const [inputVal, setInputVal] = useState({
    userName: "",
    branchName: "",
    helpWithDepartmentName: "",
    issueType: "",
    description: ""
  });

  const onChangeHandler = (event) => {
    setInputVal((oldData) => {
      return { ...oldData, [event.target.name]: event.target.value };
    });
  };


  const postData = async (event) => {
    event.preventDefault();
    
    const { helpWithDepartmentName, issueType, description} = inputVal

    const res = await fetch(`${BASE_URL}/helpticket`,{
        method:"POST",
        headers:{
            "content-type": "application/json"
        },
        // must write credentials: "include" otherwise it will not carry you cookie so you will not get your jwtoken.
        credentials: "include",
        body: JSON.stringify({
          helpWithDepartmentName, issueType, description
        })
    });

    
    const data = await res.status;
    console.log( data)

    if(data === 200){
      notifySuccessful()
      setInputVal({helpWithDepartmentName: "",
      issueType: "",
      description: ""})
        console.log("Helpticket submitted")
     
    }else{
      notifyFailed()
      console.log("Something wrong")
        
    }
  };




  const departmentNameArr = ["IT", "Accounts", "Logistics", "Collections", "HR", "FMS"]
  const itArr = ["Computer Software", "Computer Hardware", "Internet", "SAP", "Email/ Drive", "Landline (Intercom)", "Other"]
  const accountsArr = ["GSTR1", "GSTR3B", "Bank Reco", "Cheque Issue", "Other"]
  const logisticsArr = ["Shipment Status", "Invoice Details", "Transporter Details", "Other"]
  const collectionArr = ["Pending Clients", "Other"]
  const marcomArr = ["Swatch Book", "FB Post", "Other"]
  const hrArr = ["Salary Slip", "Leave", "Increment", "Other"]
  const fmsArr = ["New Checklist", 'Scorecard', "New FMS", "Other"]


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
  const lockOutStyle = {fontSize: "30px"};
  const inputStyle = { margin: "15px 0px 5px 0px" };
  const btnStyle = { margin: "40px 0px 15px 0px" };

  return <>
  { loginData.length > 0 ? (
    <>
    <Grid >
      <Paper
        elevation={10}
        style={paperStyle}
        sx={{
          m: { xs: "90px auto 0px auto", sm: "85px auto 0px auto" },
          height: { xs: "110vh", sm: "85vh" },
        }}
      >
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <ManageAccountsOutlinedIcon style={lockOutStyle} />
          </Avatar>
          <p style={{color: "#4b4a4a", fontSize: "25px", fontWeight: "500"}}>Need Help</p>
        </Grid>
        <TextField
          variant="standard"
          id="userName"
          name="userName"
          label="Your Name"
          value={loginData.length > 0 ? loginData[0][0] : "User Name"}
          placeholder="Enter Your Name"
          style={inputStyle}
          fullWidth
        />
        <TextField
        variant="standard"
        id="branchName"
        name="branchName"
        label="Branch Name"
        value={loginData.length > 0 ? loginData[0][1] : "Branch Name"}
        placeholder="Enter Your Branch Name"
        style={inputStyle}
        fullWidth
      />
      <FormControl variant="standard" fullWidth style={inputStyle}>
        <InputLabel id="demo-simple-select-standard-label">Assistance From Head Office Department</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="helpWithDepartmentName"
          name="helpWithDepartmentName"
          value={inputVal.helpWithDepartmentName}
          onChange={onChangeHandler}
          label="Assistance From Head Office Department"

        >
        {
          departmentNameArr.map(val => <MenuItem value={val}>{val}</MenuItem>)
        }
        </Select>
      </FormControl>
      <FormControl variant="standard" fullWidth style={inputStyle}>
      <InputLabel id="demo-simple-select-standard-label">Issue Type</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="issueType"
        name="issueType"
        label="Issue Type"
        value={inputVal.issueType}
        onChange={onChangeHandler}
      >
        {inputVal.helpWithDepartmentName === "IT"
              ? itArr.map(val => <MenuItem value={val} >{val}</MenuItem>)
              : inputVal.helpWithDepartmentName === "Accounts"
              ? accountsArr.map(val => <MenuItem value={val} >{val}</MenuItem>)
              : inputVal.helpWithDepartmentName === "Logistics"
              ? logisticsArr.map(val => <MenuItem value={val} >{val}</MenuItem>)
              : inputVal.helpWithDepartmentName === "Collections"
              ? collectionArr.map(val => <MenuItem value={val} >{val}</MenuItem>)
              : inputVal.helpWithDepartmentName === "Marcom"
              ? marcomArr.map(val => <MenuItem value={val} >{val}</MenuItem>)
              : inputVal.helpWithDepartmentName === "HR"
              ? hrArr.map(val => <MenuItem >{val}</MenuItem>)
              : inputVal.helpWithDepartmentName === "FMS"
              ? fmsArr.map(val => <MenuItem value={val} >{val}</MenuItem>)
              : ""}
      </Select>
    </FormControl>
    <div className="col-md-12 mb-2 mt-3">
          <label htmlFor="desc" className="form-label">
            <span> Description </span>
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={inputVal.description}
            onChange={onChangeHandler}
            rows="3"
            placeholder="Describe your problem...."
          />
        </div>
        <Stack direction="row" spacing={4} style={btnStyle}>
          <Button variant="outlined" fullWidth startIcon={<DeleteIcon />}>
            Reset
          </Button>
          <Button variant="contained" fullWidth onClick={postData} endIcon={<SendIcon />}>
            Submit
          </Button>
        </Stack>
      </Paper>
    </Grid>
    <ToastContainer />
    </>
  ) : navigate("/login")
      }
      </>
  
}

export default HelpTicketForm;



