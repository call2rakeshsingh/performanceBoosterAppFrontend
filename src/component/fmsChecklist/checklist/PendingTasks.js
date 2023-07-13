import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from "react-router-dom";
import { useValidateUser, BASE_URL, formatDate } from '../../../helper';
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PendingTasks = () => {
    const navigate = useNavigate();
    useValidateUser();

    const callPendingTasks = async () => {
    
        try {
          const respose = await fetch(`${BASE_URL}/pendingtasks`,{
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

      
        callPendingTasks();
    
      },[])

  const loginData = useSelector((store) => store.loginLogout.items)

  const notifySuccessful = () => toast.success('Change submitted successfully!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

    const notifyWarn = () => toast.warn('No change detected in status!!!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  const notifyFailed = () => toast.error('Failed from server!!!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });


     const [filtering, setFiltering] = useState(false);
    const [grouping, setGrouping] = useState(false);

    const defaultMaterialTheme = createTheme();
    const [tableData, setTableData] = useState([])

      const columns = [
        { title: "Task Name", field: "taskName", editable: 'never' },
        { title: "Planning Time", field: "planning", editable: 'never', sorting: true, defaultSort: "asc", render: rowData => formatDate(rowData.planning) },
        { title: "Meeting Type", field: "meetingType", editable: 'never' },
        { title: "Actual Time", field: "actual", editable: 'never', render: rowData => formatDate(rowData.actual), emptyValue: () => <em>_</em> },
        { title: "Time Delay", field: "timeDelay", editable: 'never', render: rowData => {
          const planningTime = new Date(rowData.planning);
          const actualTime = rowData.actual ? new Date(rowData.actual) : new Date();
          const delay = (actualTime - planningTime) / 1000;
          const hours = Math.floor(delay / 3600);
          const minutes = Math.floor((delay % 3600) / 60);
          const seconds = Math.floor(delay % 60);
          const negative = delay < 0 ? "-" : "";
          return <div style={{background: negative ? "inherit" : "#ffb6c1", paddingLeft: "5px"}}>{`${negative}${Math.abs(hours)}:${Math.abs(minutes)}:${Math.abs(seconds)}`}</div>
          
          
        }},
        { title: "Status", field: "status", lookup: {Pending: "Pending", Done: "Done"}, emptyValue: () => <em>_</em> },
        { title: "Remarks", field: "remarks", emptyValue: () => <em>_</em> },
      ];

    return <>
  { loginData.length > 0 ?
  (
        <div className='top75'>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable 
 
                title="Pending Tasks - Checklist" columns={columns} data={tableData} 

                editable={{
                        onBulkUpdate: (changes) => {
                            return new Promise(async (resolve, reject) => {
                            const newTableData = [...tableData];
                            let changeArray = []; // create an empty array
                            Object.values(changes).forEach((change) => {
                                const { newData } = change;
                                const index = tableData.findIndex(
                                (item) => item.tableData.id === newData.tableData.id
                                );
                                newTableData[index] = newData;
                                console.log(newData)
                                const { _id, status, remarks } = newData; 
                                if(status === "Done"){// extract useful data
                                changeArray.push({ _id, status, remarks}) // push only useful data into the array
                                }
                            });
                            console.log(changeArray)
                            // setTableData(newTableData);
                            
                            try {
                                const response = await fetch(`${BASE_URL}/updatependingtask`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                credentials: "include",
                                body: JSON.stringify({ ...changeArray }),
                                });

                                const data = await response.status;
                                console.log(data)
                                resolve(changeArray);
                                changeArray.length !== 0 ? notifySuccessful() : notifyWarn() // resolve the promise with the array of changes
                            } catch (error) {
                                notifyFailed()
                                console.log("inside try block")
                                console.error(error);
                                reject(error);
                                resolve()
                            }
                            callPendingTasks()
                            
                            });
                        }
                        }}

                actions={[
                    {
                        icon:() => filtering ? <FilterAltOffOutlinedIcon />:<FilterAltOutlinedIcon />,
                        tooltip: "Enable Filter",
                        onClick: () => {setFiltering(currentFilter => {
                            return !currentFilter
                            })},
                        isFreeAction: true
                    },     
                    {
                        icon:() => grouping ? <GroupIcon />:<GroupOutlinedIcon />,
                        tooltip: "Apply Grouping",
                        onClick: () => {setGrouping(currentFilter => {
                            
                            return !currentFilter
                            })},
                        isFreeAction: true
                    },                   
                ]}
                options={{ sorting: true, filtering: filtering, editable: true, pageSize: 15, pageSizeOptions: [10, 20, 50, 100], paginationType: "stepped", exportButton: true, exportAllData: true, actionsColumnIndex:-1,  grouping: grouping, columnsButton: true, titleStyle: {backgroundColor: "blue"}, rowStyle: (data,index) => {return index%2 == 0 ? null : {backgroundColor: "#FAF9F6"}}, headerStyle: {backgroundColor: "lightgray"} }} 
                
                />
  
            </ThemeProvider>
            <ToastContainer />
        </div>
    ) : navigate("/login")
  }
    </>

}

export default PendingTasks
