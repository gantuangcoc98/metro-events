import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SidebarData } from "./custom_components/SideBarData";
import * as MdIcons from "react-icons/md";
import * as Fa6Icons from "react-icons/fa6";
import * as RiIcons from "react-icons/ri";
import './App.css';

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
      <div className="flex p-[30px] items-center justify-between bg-dirty-white">
        <div className="flex justify-start w-[25%]">
          <Fa6Icons.FaBars className="menu_bar" onClick={()=>{showSideBar()}}/>
        </div>

        <div className="flex justify-center w-[50%] items-center">
          <h3 className="text-center text-normal font-normal p-0 m-0 cursor-pointer text-[30px] text-dark-green w-fit"
            onClick={()=>{handleOnClick('Home')}}
          >
            Metro Events
          </h3>
        </div>

        <div className="grid items-center justify-end w-[25%] grid-cols-3">
          <span className="flex justify-end w-full"><RiIcons.RiNotification3Line className="notification_icon" onClick={()=>{handleOnClick('Notification')}}/></span>
          <button className="flex justify-end border-none text-dark-green text-[20px] bg-transparent pr-[20px] m-0 hover:cursor-pointer hover:text-light-brown" onClick={()=>{handleOnClick('Login')}}>
            Login
          </button>
          <button className="text-dark-green border border-black bg-transparent px-[12px] py-[9px] text-[20px] hover:bg-dark-green hover:text-white hover:border hover:border-dark-green" 
            onClick={()=>{handleOnClick('Register')}}
          >Register</button>
        </div>
      </div>

      <nav className={sideBar ? 'sidebar active': 'sidebar'}>
        <div className="flex justify-end">
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