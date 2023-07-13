import MaterialTable, {MTableToolbar} from "material-table";
import { loginState, logoutState } from "./reduxStore/loginSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



// export const BASE_URL = "http://localhost:7000"; // replace with your API base URL
export const BASE_URL = "https://performanceboosterappbackend.onrender.com"; // replace with your API base URL


// Custom Hook - useValidateUser.js



export const useValidateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/validateuser`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        const status = response.status;
        if (status === 200) {
          // user is logged in, get user details
          const userData = await response.json();
          dispatch(loginState(userData))
        
        } else {
          dispatch(logoutState())
          navigate("/login")
        }
      } catch (error) {
        console.log("Error validating user:", error);
      }
    };

    validateUser();
  }, [dispatch]);
};


export const validateUser = async () => {

  try {
    const response = await fetch(`${BASE_URL}/validateuser`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    const status = response.status;
    if (status === 200) {
      return true; // user is logged in
    } else {
      return false; // user is not logged in
    }
  } catch (error) {
    console.log("Error validating user:", error);
    return false;
  }
};

export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().padStart(4, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

export function CustomToolbar(props) {

    return (
        <div style={{ }}>
      <MTableToolbar {...props}  />
      </div>
    );
    //   If you wanted to change table color or design the user CustomToolbar component and inside material table write below code
// components={{
//                 Toolbar: CustomToolbar
//            }}
  }


