import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from "react-router-dom";
import { useValidateUser, BASE_URL, formatDate } from "../../../helper";
import { useSelector } from 'react-redux';


const ToHelpTicketResolve = () => {
  const navigate = useNavigate();
  useValidateUser();
  const loginData = useSelector((store) => store.loginLogout.items)

  const callResolveTicketPage = async () => {
    try {
      const respose = await fetch(`${BASE_URL}/helptickettoresolve`,{
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
          // eslint-disable-next-line
          console.log(`Data is not coming from your helpticket resolve`)
        }
    } 
    catch (error) {
      console.log("Tocken is not verified")
    }
  }

    useEffect(() => {

      
        callResolveTicketPage();
    
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
        { title: "Approval", field: "managerApproval", editable: 'never', lookup: {Pending: "Pending", Approved: "Approved", Rejected: "Rejected"}  },
        { title: "Remarks", field: "managerRemarks", editable: 'never', emptyValue: () => <em>_</em> },
        { title: "Timestamp", field: "finalTimestamp", editable: 'never', hidden: true, hiddenByColumnsButton: true, render: rowData => rowData.finalTimestamp !== null ? formatDate(rowData.finalTimestamp): "-",},
        { title: "Status", field: "finalStatus", lookup: {Pending: "Pending", Resolved: "Resolved", Rejected: "Rejected" } },
        { title: "Remarks", field: "finalRemarks", emptyValue: () => <em>_</em> },
    ]

    return <>
    { loginData.length > 0 ?
    (
        <div className='top75'>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable 
                         
                title="Help Ticket - To Resolove" columns={columns} data={tableData} 
                
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
                          const { _id, finalStatus, finalRemarks } = newData; // extract useful data
                          if(finalStatus === "Resolved"){// extract useful data
                                changeArray.push({ _id, finalStatus, finalRemarks, finalTimestamp: new Date()}) // push only useful data into the array
                                } // push only useful data into the array
                      });
                      console.log(changeArray)
                      // setTableData(newTableData);
                      
                      try {
                          const response = await fetch(`${BASE_URL}/updatehelptickettoresolve`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          credentials: "include",
                          body: JSON.stringify({ ...changeArray }),
                          });

                          const data = await response.status;
                          console.log(data)
                          resolve(changeArray); // resolve the promise with the array of changes
                      } catch (error) {
                          console.log("inside try block")
                          console.error(error);
                          reject(error);
                          resolve()
                      }

                      callResolveTicketPage()
                      
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
        </div>
    ): navigate("/login")
  }
    </>

}

export default ToHelpTicketResolve
