import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Root from './Root';
import FAQ from './component/faqs/FAQ';
import HelpTicketForm from './component/helptickets/helpTicketForm/HelpTicketForm';
import LoginPage from './component/headerFooter/navBar/profile/loginLogoutSignUp/LoginPage'
import SignupPage from './component/headerFooter/navBar/profile/loginLogoutSignUp/SignupPage';
import YourHelpTicket from './component/helptickets/helpTicketData/YourHelpTicket'
import ToHelpTicketApproval from './component/helptickets/helpTicketData/ToHelpTicketApproval'
import ToHelpTicketResolve from './component/helptickets/helpTicketData/ToHelpTicketResolve'
import TicketApprovedByYou from './component/helptickets/helpTicketData/TicketApprovedByYou';
import TicketResolvedByYou from './component/helptickets/helpTicketData/TicketResolvedByYou';
import PendingTasks from './component/fmsChecklist/checklist/PendingTasks';
import CompletedTasks from './component/fmsChecklist/checklist/CompletedTasks';
import AllTasks from './component/fmsChecklist/checklist/AllTasks';
import Dashboards from './component/dashboard/Dashboards';
import LogoutPage from './component/headerFooter/navBar/profile/loginLogoutSignUp/LogoutPage';
import UploadCsv from './UploadCsv';
import ChecklistFormUpload from './ChecklistFormUpload';


{/*     errorElement: <ErrorPage />,*/}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
    { path: "", element: <Dashboards /> },
    { path: "faq", element: <FAQ /> },
    { path: "helpticketform", element: <HelpTicketForm /> },
    { path: "login", element: <LoginPage /> },
    { path: "logout", element: <LogoutPage /> },
    { path: "signup", element: <SignupPage /> },
    { path: "yourhelpticket", element: <YourHelpTicket /> },
    { path: "helptickettoapproval", element: <ToHelpTicketApproval /> },
    { path: "helptickettoresolve", element: <ToHelpTicketResolve /> },
    { path: "helpticketapproved", element: <TicketApprovedByYou /> },
    { path: "helpticketresolved", element: <TicketResolvedByYou /> },
    { path: "pendingtasks", element: <PendingTasks /> },
    { path: "completedtasks", element: <CompletedTasks /> },
    { path: "alltasks", element: <AllTasks /> },
    { path: "uploadcsv", element: <UploadCsv /> },
    { path: "checklistupload", element: <ChecklistFormUpload /> },
],

  },


]);

export default router;
