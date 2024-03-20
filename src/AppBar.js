import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SidebarData } from "./custom_components/SideBarData";
import * as MdIcons from "react-icons/md";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FEFAE0",
    },
  },
});

function ButtonAppBar() {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);

  const handleOnClick = (event) => {
    switch (event) {
      case 'home':

        navigate('/');
        console.log('Navigating to home...');
        break;
      case 'login':
        navigate('/login');
        console.log('Navigating to login page...');
        break;
      default:
        break;
    }
  }

  const showSideBar = () => {setSideBar(!sideBar)};

  return (
    <>
      <div className="app_bar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{showSideBar()}}
          >
            <MenuIcon
              style={
                {
                  fontSize: '30px',
                  fontWeight: 'lighter',
                }
              }
            />
          </IconButton>
          <h3 style={
            {
              textAlign: 'center', 
              fontWeight: 'normal', 
              padding: '0', 
              margin: '0', 
              cursor: 'pointer',
              fontSize: '25px',
            }} 
            onClick={()=>{handleOnClick('home')}}
          >
            Event Title
          </h3>
          <div style={{marginRight: '10px'}}>
            <button className="button_theme" onClick={()=>{handleOnClick('login')}}>Login</button>
          </div>
      </div>
      <nav className={sideBar ? 'sidebar active': 'sidebar'}>
        <div style={{display: 'inherit', justifyContent: 'end'}}>
          <MdIcons.MdClose onClick={()=>{showSideBar()}} className="icon_button"/>
        </div>
        <ul className="sidebar_items">
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.className} onClick={()=>{ navigate(item.path); showSideBar(); }}>
                {item.icon}
                {item.title}
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  );
}

export default ButtonAppBar;