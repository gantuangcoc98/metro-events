import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SidebarData } from "./custom_components/SideBarData";
import * as MdIcons from "react-icons/md";
import * as Fa6Icons from "react-icons/fa6";

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
        <Fa6Icons.FaBars
          className="icon_button"
          style={{
            fontSize: '25px',
            cursor: 'pointer',
          }}
          onClick={()=>{showSideBar()}}
        />
        <h3 style={
          {
            textAlign: 'center', 
            fontWeight: 'normal', 
            padding: '0', 
            margin: '0', 
            cursor: 'pointer',
            fontSize: '30px',
          }} 
          onClick={()=>{handleOnClick('home')}}
        >
          Event Title
        </h3>
        <button className="button_theme" onClick={()=>{handleOnClick('login')}}>Login</button>
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