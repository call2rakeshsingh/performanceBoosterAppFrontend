import React, { useState, useEffect } from "react";
import { logoutState } from "../../../../../reduxStore/loginSlice";
import store from "../../../../../reduxStore/createStore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../../../../helper";


const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const notify1Successful = () => toast.success('You are logouted successfully!!!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const notify1Failed = () => toast.error('Something went wrong!!!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  

  useEffect(() => {
    console.log("Logout Page")
    const callHelpTicketPage = async () => {

      try {
        const respose = await fetch(`${BASE_URL}/logout`,{
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
        
        const data = await respose.status;
        console.log(`This is log status code from server${data}`);
  
        if(data == 200) {
            console.log("YOu are logouted this is frontend")
            
            dispatch(logoutState())
            // eslint-disable-next-line
            navigate("/login")
            notify1Successful()

        } else{
          navigate(-1)
          notify1Failed()
        }
  
      } 
      catch (error) {
        console.log("front end error in auth token")
      }
    }
  
    callHelpTicketPage();

  },[])

  return(
    <>
        <ToastContainer />
    </>
  )
}

export default Logout;