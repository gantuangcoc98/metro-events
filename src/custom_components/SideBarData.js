import * as IoIcons from 'react-icons/io';
import* as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";


export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        className: 'sidebar_text',
        icon: <IoIcons.IoMdHome />,
    },
    {
        title: 'Events',
        path: '/events',
        className: 'sidebar_text',
        icon: <BsIcons.BsCalendar3Event  />,
    },
]