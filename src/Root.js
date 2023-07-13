import React from 'react'
import Navbar from './component/headerFooter/navBar/Navbar'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./reduxStore/createStore"

const Root = () => {
  return (
<Provider store={store}>
    <Navbar />
    <Outlet />
</Provider>
  )
}

export default Root;
