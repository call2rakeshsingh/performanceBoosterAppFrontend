
import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from "react-router-dom";
import { useValidateUser, BASE_URL, formatDate } from "../../../helper";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';




const ToHelpTicketApproval = () => {
  const navigate = useNavigate();
  useValidateUser();
     
  const notifySuccessful = () => toast.success('Helpticket approval submitted successfully!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const notifyWarn = () => toast.warn('Approval status not changed!!!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  const notifyFailed = () => toast.error('Helpticket approval failed!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });



  const loginData = useSelector((store) => store.loginLogout.items)

  const callApprovalHelpTicket = async () => {
        
    try {
      const respose = await fetch(`${BASE_URL}/helptickettoapproval`,{
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
            
            callApprovalHelpTicket();
          },[])



    const [filtering, setFiltering] = useState(false);
    const [grouping, setGrouping] = useState(false);

    const defaultMaterialTheme = createTheme();
    const [tableData, setTableData] = useState([])

    const columns = [
        { title: "Timestamp", field: "userTimestamp", sorting: true, defaultSort: "asc", editable: 'never', hidden: true, hiddenByColumnsButton: true, render: rowData => rowData.userTimestamp !== null ? formatDate(rowData.userTimestamp): "-",},
        { title: "Name", field: "userName", editable: 'never' },
        { title: "Branch", field: "branchName", editable: 'never' },
        { title: "Issue Type", field: "issueType", editable: 'never' },
        { title: "Description", field: "description", editable: 'never' },
        { title: "Support With", field: "helpWithDepartmentName", editable: 'never' },
        { title: "Timestamp", field: "managerTimestamp", editable: 'never', hidden: true, hiddenByColumnsButton: true, render: rowData => rowData.managerTimestamp !== null ? formatDate(rowData.managerTimestamp): "-",},
        { title: "Approval", field: "managerApproval", lookup: {Pending: "Pending", Approved: "Approved", Rejected: "Rejected"} },
        { title: "Remarks", field: "managerRemarks", emptyValue: () => <em>_</em> },
    ]

    return <>
    { loginData.length > 0 ?
     (
        <div className='top75'>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable 
 
                title="Help Ticket - Manager Approval" columns={columns} data={tableData} 
                
                editable={{
                        onBulkUpdate: (changes) => {
                            return new Promise(async (resolve, reject) => {
                            const newTableData = [...tableData];
                            const changeArray = []; // create an empty array
                            Object.values(changes).forEach((change) => {
                                const { newData } = change;
                                const index = tableData.findIndex(
                                (item) => item.tableData.id === newData.tableData.id
                                );
                                newTableData[index] = newData;
                                console.log(newData)
                                const { _id,  managerApproval, managerRemarks } = newData; 
                                if(managerApproval === "Approved"){// extract useful data
                                changeArray.push({ _id, managerApproval, managerRemarks, managerTimestamp: new Date()}) // push only useful data into the array
                                }
                                // push only useful data into the array
                            });
                            console.log(changeArray)
                            // setTableData(newTableData);
                            
                            try {
                                const response = await fetch(`${BASE_URL}/updatehelpticketstatus`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                credentials: "include",
                                body: JSON.stringify({ ...changeArray }),
                                });

                                const data = await response.status;
                                console.log(data)
                                resolve(changeArray); // resolve the promise with the array of changes
                                changeArray.length !== 0 ? notifySuccessful() : notifyWarn()
                            } catch (error) {
                                console.log("inside try block")
                                notifyFailed()
                                console.error(error);
                                reject(error);
                                resolve()
                            }
                            callApprovalHelpTicket()
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
                options={{ sorting: true, filtering: filtering, pageSizeOptions: [5, 10, 50, 100], pageSize: 15, paginationType: "stepped", exportButton: true, exportAllData: true, actionsColumnIndex:-1,  grouping: grouping, columnsButton: true, titleStyle: {backgroundColor: "blue"}, rowStyle: (data,index) => {return index%2 == 0 ? null : {backgroundColor: "#FAF9F6"}}, headerStyle: {backgroundColor: "lightgray"} }} 
                
                />
            </ThemeProvider>
            <ToastContainer />
        </div>) : navigate("/login")
  }
    </>

}

export default ToHelpTicketApproval
