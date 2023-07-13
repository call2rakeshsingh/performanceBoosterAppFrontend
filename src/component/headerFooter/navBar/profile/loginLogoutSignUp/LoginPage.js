import React, {useEffect, useState} from "react";
import {Avatar, Button, Checkbox, FormControlLabel, Grid, Input, Link, Paper, TextField, Typography, } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

import { loginState } from "../../../../../reduxStore/loginSlice";
import store from "../../../../../reduxStore/createStore";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { validateUser, BASE_URL } from "../../../../../helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
      async function checkLoginStatus() {
        const loggedIn = await validateUser();
        setIsLoggedIn(loggedIn);
        console.log(loginData)
        if(loggedIn){
          navigate("/")
        }
      }
      checkLoginStatus();
    }, []);

 

  const loginData = useSelector((store) => store.loginLogout.items)

  const notifySuccessful = () => toast.success('Login Successful!!!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });


  const notifyFailed = () => toast.error('Invalid Error Credentials!!!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const [showPassword, setShowPassword] = React.useState(false);
  const [inputVal, setInputVal] = useState({
    userEmail: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    setInputVal((oldData) => {
      return { ...oldData, [event.target.name]: event.target.value };
    });
  };

  

  const postData = async (event) => {
    event.preventDefault();
    const {userEmail,password} = inputVal

    try {

    const res = await fetch(`${BASE_URL}/login`,{
        method:"POST",
        headers:{
          Accept: "application/json",
          "content-type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          userEmail,password
        })
    });

      const data = await res.status;
      const data1 = await res.json();
      console.log(data1)
      
      
      
      if(data === 200){
        dispatch(loginState(data1))
        console.log(data1)
        await navigate('/')
        console.log("Login sdsdsfd Successful")      
        notifySuccessful()
    }
    else if(data !== 200){
      console.log("Invalid Credentials")
      notifyFailed()
    }
      
    } catch (error) {
      alert(error)
      notifyFailed()
    }
  };


  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
  const checkBoxStyle = { margin: "0px 0px" };
  const btnStyle = { margin: "40px 0px 15px 0px" };

  return <>
  {
    !isLoggedIn ? (
      <>
    <Grid className="newHelp">
      <Paper
        elevation={10}
        style={paperStyle}
        sx={{
          m: { xs: "90px auto 0px auto", sm: "85px auto 0px auto" },
          height: { xs: "90vh", sm: "70vh" },
        }}
      >
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon style={lockOutStyle} />
          </Avatar>
          <p style={{color: "#4b4a4a", fontSize: "25px", fontWeight: "500"}}>Sign In</p>
        </Grid>
        <TextField
          variant="standard"
          id="userEmail"
          name="userEmail"
          label="Username"
          value={inputVal.userEmail}
          onChange={onChangeHandler}
          placeholder="Enter Your Username"
          fullWidth
          style={inputStyle}
        />
        <FormControl variant="standard" fullWidth style={inputStyle}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="password"
            name="password"
            value={inputVal.password}
            onChange={onChangeHandler}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              name="checkBox"
              color="primary"
              style={checkBoxStyle}
            />
          }
          label="Remember me"
        />

        <Button type="submit" onClick={postData} fullWidth variant="contained" style={btnStyle}>
          Sign In
        </Button>

        <Typography>
          <Link>Forgot Password</Link>
        </Typography>
        <Typography>
          Do you have an account ? &nbsp;
          <Link>Sign Up</Link>
        </Typography>
      <ToastContainer />
      </Paper>
    </Grid>
      </>
  ) : navigate("/")
  }
    </>
}

export default Login;
