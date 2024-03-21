import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SidebarData } from "./custom_components/SideBarData";
import * as MdIcons from "react-icons/md";
import * as Fa6Icons from "react-icons/fa6";
import * as RiIcons from "react-icons/ri";

function ButtonAppBar() {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [notification, setNotification] = useState(false);

  const handleOnClick = (event) => {
    switch (event) {
      case 'Home':
        navigate('/');
        console.log('Navigating to home...');
        break;
      case 'Notification':
        setNotification(!notification);
        console.log('Notification clicked');
        break;
      case 'Login':
        navigate('/login');
        console.log('Navigating to login page...');
        break;
      case 'Register':
        navigate('/register');
        console.log('Navigating to register page...');
        break;
      default:
        break;
    }
  }

  const showSideBar = () => {setSideBar(!sideBar)};

  return (
    <>
      <div className="app_bar">
        <div style={{display: 'flex', width: '25%', justifyContent: 'start', alignItems: 'center'}}>
          <Fa6Icons.FaBars
            className="icon_button"
            style={{
              fontSize: '25px',
              cursor: 'pointer',
            }}
            onClick={()=>{showSideBar()}}
          />
        </div>

        <h3 style={
          {
            textAlign: 'center', 
            fontWeight: 'normal', 
            padding: '0', 
            margin: '0', 
            cursor: 'pointer',
            fontSize: '30px',
            color: '#283618',
            width: '50%',
          }} 
          onClick={()=>{handleOnClick('Home')}}
        >
          Metro Events
        </h3>

        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '15px', width: '25%'
          }}
        >
          <RiIcons.RiNotification3Line className="notification_icon" onClick={()=>{handleOnClick('Notification')}}/>
          <button className="login_button" onClick={()=>{handleOnClick('Login')}}>Login</button>
          <button className="register_button" onClick={()=>{handleOnClick('Register')}}>Register</button>
        </div>
      </div>

      <nav className={sideBar ? 'sidebar active': 'sidebar'}>
        <div style={{display: 'inherit', justifyContent: 'end'}}>
          <MdIcons.MdClose onClick={()=>{showSideBar()}} className="close_nav_bar"/>
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