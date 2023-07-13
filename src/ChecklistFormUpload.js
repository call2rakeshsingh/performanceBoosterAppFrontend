import React, {useState, useEffect} from "react";
import store from "./reduxStore/createStore";
import { useSelector } from "react-redux";
import {Avatar, Button, Grid, Paper, TextField, MenuItem, Select} from "@mui/material";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { useValidateUser, BASE_URL } from "./helper";


function ChecklistFormUpload() {
  const navigate = useNavigate();
  useValidateUser();
  const [file, setFile] = useState(null);
  const loginData = useSelector((store) => store.loginLogout.items)


  const [inputVal, setInputVal] = useState({
    companyName: "",
    branchId: "",
    departmentId: "",
    managerEmail: "",
    userEmail: "",
    yearName: "",
    monthName: "",
    taskName: "",
    type:"",
    planning: "",
    actual: "",
    status: "",
    remarks: "",
    
  });

  const onChangeHandler = (event) => {
    if (event.target.name === "file") {
      setFile(event.target.files[0]);
    } else {
      setInputVal((oldData) => {
        return { ...oldData, [event.target.name]: event.target.value };
      });
    }
  };


  const postData = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    for (const key in inputVal) {
      formData.append(key, inputVal[key]);
    }
    const res = await fetch(`${BASE_URL}/checklistupload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      // must write credentials: "include" otherwise it will not carry you cookie so you will not get your jwtoken.
      credentials: "include",
      body: formData,
    });

    const data = await res.status;
    console.log(data);

    if (data === 200) {
      alert("Checklist Submitted");
      console.log("Checklist Submitted");
    } else {
      alert("Checklist submission failed");
      console.log("Checklist submission failed");
    }
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };




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
    <Grid >
      <Paper
        elevation={10}
        style={paperStyle}
        sx={{
          m: { xs: "90px auto 0px auto", sm: "85px auto 0px auto" },
          height: { xs: "110vh", sm: "135vh" },
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
          id="companyName"
          name="companyName"
          label="Company Name"
          value={inputVal.companyName}
          placeholder="Enter Your Company Name"
          style={inputStyle}
          onChange={onChangeHandler}
          fullWidth
        />
        <TextField
        variant="standard"
        id="branchId"
        name="branchId"
        label="Branch Id"
        value={inputVal.branchId}
        placeholder="Enter Your Branch Id"
        style={inputStyle}
        onChange={onChangeHandler}
        fullWidth
      />
        <TextField
        variant="standard"
        id="departmentId"
        name="departmentId"
        label="Department Id"
        value={inputVal.departmentId}
        placeholder="Enter Your Department Id"
        style={inputStyle}
        onChange={onChangeHandler}
        fullWidth
      />
        <TextField
        variant="standard"
        id="managerEmail"
        name="managerEmail"
        label="Manager Email"
        value={inputVal.managerEmail}
        placeholder="Enter Your Manager Email"
        style={inputStyle}
        onChange={onChangeHandler}
        fullWidth
      />
        <TextField
        variant="standard"
        id="userEmail"
        name="userEmail"
        label="User Email"
        value={inputVal.userEmail}
        placeholder="Enter Your Email"
        style={inputStyle}
        onChange={onChangeHandler}
        fullWidth
      />

        <TextField
        variant="standard"
        id="yearName"
        name="yearName"
        label="Write Year"
        value={inputVal.yearName}
        placeholder="Write Year"
        style={inputStyle}
        onChange={onChangeHandler}
        fullWidth
      />
        <TextField
        variant="standard"
        id="monthName"
        name="monthName"
        label="Month"
        value={inputVal.monthName}
        placeholder="Write Month"
        style={inputStyle}
        onChange={onChangeHandler}
        fullWidth
      />

        <InputLabel id="file-label">File</InputLabel>
        <input
          type="file"
          id="file"
          name="file"
          onChange={onFileChange}
          accept=".csv"
        />

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
  
  ) : navigate("/login")
      }
      </>
  
}

export default ChecklistFormUpload;


