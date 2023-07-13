import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "../../../assets/sonaLogo.png";
import { CssBaseline } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

{/* <img src={logo} alt="Kitty Katty!" style={{ maxWidth: "80px", marginTop:'5px'}}/> */}
{/* <img src={logo} alt="Kitty Katty!" style={{ maxWidth: "70px", marginTop:'5px'}}/> */}
const userDetails = ['Attaindance', 'Basic Info', 'Salary Slip', 'Employee PF', 'Employee ESIC', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElHelpTicketMobile, setAnchorElHelpTicketMobile] = useState(null);
    const [anchorElHelpTicketDesktop, setAnchorElHelpTicketDesktop] = useState(null);
    const [anchorElChecklistMobile, setAnchorElChecklistMobile] = useState(null);
    const [anchorElChecklistDesktop, setAnchorElChecklistDesktop] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleOpenHelpTicketMobile = (event) => {
      setAnchorElHelpTicketMobile(event.currentTarget);
    };
    const handleOpenHelpTicketDesktop = (event) => {
      setAnchorElHelpTicketDesktop(event.currentTarget);
    };
    const handleOpenChecklistMobile = (event) => {
      setAnchorElChecklistMobile(event.currentTarget);
    };
    const handleOpenChecklistDesktop = (event) => {
      setAnchorElChecklistDesktop(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleCloseHelpTicketMobile = () => {
        setAnchorElHelpTicketMobile(null);
        setAnchorElNav(null);
    };
    const handleCloseHelpTicketDesktop = () => {
        setAnchorElHelpTicketDesktop(null);  
    };
    const handleCloseChecklistMobile = () => {
        setAnchorElChecklistMobile(null);
        setAnchorElNav(null);
    };
    const handleCloseChecklistDesktop = () => {
        setAnchorElChecklistDesktop(null);
    };

  return (
    <>
    <CssBaseline/>
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, }}>
        <Typography><span style={{fontSize: "16px", color: "234,234,234"}}>performance</span><span style={{fontSize: "25px", fontWeight: "bold"}}>Booster</span></Typography>
        </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/"><Typography textAlign="center">Dashboard</Typography></NavLink>
                </MenuItem>
                <MenuItem
                        id="basic-button3"
                        aria-controls={Boolean(anchorElChecklistMobile) ? 'basic-menu3' : undefined}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorElChecklistMobile) ? 'true' : undefined}
                        onClick={handleOpenChecklistMobile}
                        sx= {{display: { xs: 'flex', md: 'none' }}}
                    >
                    <Typography textAlign="center">Checklist</Typography>
                    </MenuItem>
                    <Menu
                    
                        anchorEl={anchorElChecklistMobile}
                        open={Boolean(anchorElChecklistMobile)}
                        onClose={handleCloseChecklistMobile}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button3',
                        }}
                        sx= {{display: { xs: 'flex', md: 'none' }}}

                        anchorOrigin={{
                            vertical: 'right',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'left',
                            horizontal: 'left',
                        }}
                    >
                        <NavLink to="/pendingtasks"><MenuItem onClick={handleCloseChecklistMobile}>1Pending Takss</MenuItem></NavLink>
                        <NavLink to="/completedtasks"><MenuItem onClick={handleCloseChecklistMobile}>Complited Tasks</MenuItem></NavLink>
                        <NavLink to="/alltasks"><MenuItem onClick={handleCloseChecklistMobile}>All Tasks</MenuItem></NavLink>
                        </Menu>
                  <MenuItem
                        id="basic-button"
                        aria-controls={Boolean(anchorElHelpTicketMobile) ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorElHelpTicketMobile) ? 'true' : undefined}
                        onClick={handleOpenHelpTicketMobile}
                        sx= {{display: { xs: 'flex', md: 'none' }}}
                    >
                    <Typography textAlign="center">Help Ticket</Typography>
                    </MenuItem>
                    <Menu
                    
                        anchorEl={anchorElHelpTicketMobile}
                        open={Boolean(anchorElHelpTicketMobile)}
                        onClose={handleCloseHelpTicketMobile}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                        sx= {{display: { xs: 'flex', md: 'none' }}}

                        anchorOrigin={{
                            vertical: 'right',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'left',
                            horizontal: 'left',
                        }}
                    >
                        <NavLink to="/helpticketform"><MenuItem onClick={handleCloseHelpTicketMobile}>Form</MenuItem></NavLink>
                        <NavLink to="/yourhelpticket"><MenuItem onClick={handleCloseHelpTicketMobile}>Your Tickets</MenuItem></NavLink>
                        <NavLink to="/helptickettoapproval"><MenuItem onClick={handleCloseHelpTicketMobile}>To Approval</MenuItem></NavLink>
                        <NavLink to="/helptickettoresolve"><MenuItem onClick={handleCloseHelpTicketMobile}>To Resolve</MenuItem></NavLink>
                        <NavLink to="/helpticketapproved"><MenuItem onClick={handleCloseHelpTicketMobile}>All Approved Tickets</MenuItem></NavLink>
                        <NavLink to="/helpticketresolved"><MenuItem onClick={handleCloseHelpTicketMobile}>All Resolved Tickets</MenuItem></NavLink>
                    </Menu>

                    <NavLink to="/faq"><MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">FAQ</Typography>
                </MenuItem></NavLink>
                {/* <NavLink to="/login"><MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem></NavLink> */}
                {/* <NavLink to="/signup"><MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Sign Up</Typography>
                </MenuItem></NavLink> */}
              

              
            </Menu>
          </Box>
       

          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 2, flexGrow: 1, }}>
         
          <Typography><span style={{fontSize: "16px", color: "234,234,234"}}>performance</span><span style={{fontSize: "25px", fontWeight: "bold"}}>Booster</span></Typography>
        
          </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml:5 }}>
                
            <NavLink to="/"><Button 
                    sx={{ my: 2, mx:1, color: 'white', display: 'block' }}
                >
                    Dashboard
                </Button></NavLink>
                <Button
                    aria-controls={Boolean(anchorElChecklistDesktop) ? 'basic-menu5' : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorElChecklistDesktop) ? 'true' : undefined}
                    onClick={handleOpenChecklistDesktop}
                    sx={{my: 2, mx:1, color: 'white', display: 'block'}}
            >
                    Checklist
                </Button>
                <Menu

                    anchorEl={anchorElChecklistDesktop}
                    open={Boolean(anchorElChecklistDesktop)}
                    onClose={handleCloseChecklistDesktop}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                    sx= {{display: { xs: 'none', md: 'flex' }}}
                >
                    <NavLink to="/pendingtasks"><MenuItem onClick={handleCloseChecklistDesktop}>Pending Tasks</MenuItem></NavLink>
                    <NavLink to="/completedtasks"><MenuItem onClick={handleCloseChecklistDesktop}>Completed Tasks</MenuItem></NavLink>
                    <NavLink to="/alltasks"><MenuItem onClick={handleCloseChecklistDesktop}>All Tasks</MenuItem></NavLink>
                    </Menu>
                
                <Button
                    
                    aria-controls={Boolean(anchorElHelpTicketDesktop) ? 'basic-menu1' : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorElHelpTicketDesktop) ? 'true' : undefined}
                    onClick={handleOpenHelpTicketDesktop}
                    sx={{my: 2, mx:1, color: 'white', display: 'block'}}
            >
                    Help Ticket
                </Button>
                <Menu

                    anchorEl={anchorElHelpTicketDesktop}
                    open={Boolean(anchorElHelpTicketDesktop)}
                    onClose={handleCloseHelpTicketDesktop}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                    sx= {{display: { xs: 'none', md: 'flex' }}}
                >
                    <NavLink to="/helpticketform"><MenuItem onClick={handleCloseHelpTicketDesktop}>Form</MenuItem></NavLink>
                    <NavLink to="/yourhelpticket"><MenuItem onClick={handleCloseHelpTicketDesktop}>Your Tickets</MenuItem></NavLink>
                    <NavLink to="/helptickettoapproval"><MenuItem onClick={handleCloseHelpTicketDesktop}>To Approval</MenuItem></NavLink>
                    <NavLink to="/helptickettoresolve"><MenuItem onClick={handleCloseHelpTicketDesktop}>To Resolve</MenuItem></NavLink>
                    <NavLink to="/helpticketapproved"><MenuItem onClick={handleCloseHelpTicketDesktop}>All Approved Tickets</MenuItem></NavLink>
                    <NavLink to="/helpticketresolved"><MenuItem onClick={handleCloseHelpTicketDesktop}>All Resolved Tickets</MenuItem></NavLink>
                </Menu>

                <NavLink to="/faq"><Button sx={{ my: 2, mx:1, color: 'white', display: 'block' }} >
                    FAQ
                </Button></NavLink>
                {/* <NavLink to="/login"><Button sx={{ my: 2, mx:1, color: 'white', display: 'block' }} >
                    Login
                </Button></NavLink> */}
                {/* <NavLink to="/signup"><Button sx={{ my: 2, mx:1, color: 'white', display: 'block' }} >
                    Sign Up
                </Button></NavLink> */}
            </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open User Details">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* 'Attaindance', 'Basic Info', 'Salary Slip', 'Employee PF', 'Employee ESIC', 'Logout' */}
              <NavLink to="/"><MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Attaindance</Typography>
                </MenuItem></NavLink>
              <NavLink to="/"><MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Basic Info</Typography>
                </MenuItem></NavLink>
              <NavLink to="/"><MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Salary Slip</Typography>
                </MenuItem></NavLink>
              <NavLink to="/"><MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Employee PF</Typography>
                </MenuItem></NavLink>
              <NavLink to="/"><MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Employee ESIC</Typography>
                </MenuItem></NavLink>
              <NavLink to="/logout"><MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem></NavLink>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}
export default ResponsiveAppBar;

