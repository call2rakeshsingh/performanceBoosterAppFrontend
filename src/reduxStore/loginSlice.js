import {createSlice} from "@reduxjs/toolkit"


const loginLogoutSlice = createSlice(
   {
     name: "loginLogout",
     initialState: {
        items: []
    },
     
     reducers:{
        loginState: (state, action) => {
            state.items.push(action.payload)
            
        },
        logoutState: (state, action) => {
            state.items = []  
        },
     }
    }
 )

export const {loginState, logoutState} = loginLogoutSlice.actions;
export default loginLogoutSlice.reducer