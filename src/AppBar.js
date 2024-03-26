import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Fa6Icons from "react-icons/fa6";
import * as RiIcons from "react-icons/ri";
import { Notification } from "./custom_components/Notification";
import * as MdIcons from "react-icons/md";
import { SidebarData } from "./custom_components/SideBarData";
import { retrieveAccount } from "./custom_components/Functions";
import './App.css';

function ButtonAppBar() {
  const [sideBar, setSideBar] = useState(false);
  const [notification, setNotification] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(
    () => {
      const LOGGED_USER = JSON.parse(window.localStorage.getItem('LOGGED_USER'));
      
      if (LOGGED_USER !== null) {
        setLoggedUser(retrieveAccount(LOGGED_USER));
        setLoginStatus(true);
      } else {
        setLoggedUser({});
        setLoginStatus(false);
      }
    }, []
  )

  const navigate = useNavigate();

  const handleOnClick = (event) => {
    switch (event) {
      case 'Home':
        navigate('/');
        console.log('Navigating to home page...');
        break;
      case 'Events':
        navigate('/events');
        console.log('Navigating to events...');
        break;
      case 'Admin':
        navigate('/admin');
        console.log('Navigating to admin page...');
        break;
      case 'Notification':
        setNotification(!notification);
        break;
      case 'Login':
        navigate('/login');
        console.log('Navigating to login page...');
        break;
      case 'Logout':
        window.localStorage.setItem('LOGGED_USER', JSON.stringify(null));
        setLoggedUser({});
        setLoginStatus(false);
        console.log('Logging out...');
        window.location.reload();
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

  const clearStorage = () => {
    window.localStorage.clear();
  }

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

        <div className="flex items-center justify-end w-[25%]">
          
          {loginStatus && 
            <div className="flex justify-end w-full items-center mr-[50px] relative gap-[25px]">
              {loggedUser.userType === 2 && 
                <button className="flex justify-end border-none text-dark-green text-[20px] bg-transparent hover:cursor-pointer hover:text-light-brown" 
                  onClick={()=>{handleOnClick('Admin')}}>
                  Admin
                </button>}
              {notification ?
                <RiIcons.RiNotification3Fill className='notification_icon' onClick={()=>{handleOnClick('Notification')}}/>
                :
                <RiIcons.RiNotification3Line className='notification_icon' onClick={()=>{handleOnClick('Notification')}}/>}
            </div>
          }
          
          <button className="flex justify-end border-none text-dark-green text-[20px] bg-transparent mr-[20px] hover:cursor-pointer hover:text-light-brown" 
                onClick={()=>{clearStorage()}}>
                Clear
              </button>

          {notification && <Notification />}

          {!loginStatus &&
            <>
              <button className="flex justify-end border-none text-dark-green text-[20px] bg-transparent mr-[20px] hover:cursor-pointer hover:text-light-brown" 
                onClick={()=>{handleOnClick('Login')}}>
                Login
              </button>

              <button className="text-dark-green border border-black bg-transparent px-[12px] py-[9px] text-[20px] hover:bg-dark-green hover:text-white hover:border hover:border-dark-green" 
                onClick={()=>{handleOnClick('Register')}}>
                Register
              </button>
            </>
          }
        </div>
      </div>

      <nav className={sideBar ? 'sidebar active': 'sidebar'}>
        <div className="flex justify-end">
            <MdIcons.MdClose onClick={()=>{showSideBar()}} className="close_nav_bar"/>
        </div>

        <div className="flex flex-col h-full">
            <ul className="sidebar_items">
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.className} onClick={()=>{
                            navigate(item.path); 
                            showSideBar();
                          }}>
                        {item.icon}
                        {item.title}
                        </li>
                    )
                })}
            </ul>

            <div className="justify-center mt-[20px] bg-dirty-white h-[2px] w-full" />

            <div className="flex m-[10px] pl-[20px] items-center text-[20px] text-white rounded-[12px] pt-[10px] pb-[10px] hover:cursor-pointer hover:bg-light-green"
                onClick={
                    ()=>{
                        loginStatus ? handleOnClick('Logout') : handleOnClick('Login'); 
                        showSideBar();
                    }}>
                <MdIcons.MdLogin className="mr-[30px]"/>
                {loginStatus ?
                    <h6 className="text-[20px]">Logout</h6>
                    :
                    <h6 className="text-[20px]">Login</h6>
                }
            </div>
        </div>
      </nav>
    </>
  );
}

export default ButtonAppBar;