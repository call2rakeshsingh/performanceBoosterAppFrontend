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


const TicketApprovedByYou = () => {

  const navigate = useNavigate();
  useValidateUser();
  const loginData = useSelector((store) => store.loginLogout.items)

    useEffect(() => {
        const callApprovedHelpTicket = async () => {
    
          try {
            const respose = await fetch(`${BASE_URL}/helpticketapproved`,{
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
      
        callApprovedHelpTicket();
    
      },[])


    const [filtering, setFiltering] = useState(false);
    const [grouping, setGrouping] = useState(false);

    const defaultMaterialTheme = createTheme();
    const [tableData, setTableData] = useState([])

    const columns = [
        { title: "Timestamp", field: "userTimestamp", sorting: true, defaultSort: "asc", editable: 'never', hidden: true, hiddenByColumnsButton: true, render: rowData => formatDate(rowData.userTimestamp),},
        { title: "Name", field: "userName", editable: 'never' },
        { title: "Branch", field: "branchName", editable: 'never' },
        { title: "Issue Type", field: "issueType", editable: 'never' },
        { title: "Description", field: "description", editable: 'never' },
        { title: "Support With", field: "helpWithDepartmentName", editable: 'never' },
        { title: "Timestamp", field: "managerTimestamp", editable: 'never', hidden: true, hiddenByColumnsButton: true, render: rowData => formatDate(rowData.managerTimestamp),},
        { title: "Approval", field: "managerApproval", lookup: {Pending: "Pending", Approved: "Approved", Rejected: "Rejected"} },
        { title: "Remarks", field: "managerRemarks", emptyValue: () => <em>_</em> },
        { title: "Timestamp", field: "finalTimestamp", editable: 'never', hidden: true, hiddenByColumnsButton: true, render: rowData => formatDate(rowData.finalTimestamp),},
        { title: "Status", field: "finalStatus" },
        { title: "Remarks", field: "finalRemarks", emptyValue: () => <em>_</em> },
    ]

    return <>
    { loginData.length > 0 ?
    (
        <div className='top75'>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable 
                        
 
                title="All Help Tickets" columns={columns} data={tableData} 

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
        </div>
    ) : navigate("/login")
  }
    </>

}

export default TicketApprovedByYou

