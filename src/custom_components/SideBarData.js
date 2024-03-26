import * as IoIcons from 'react-icons/io';
import* as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as LuIcons from "react-icons/lu";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        className: 'sidebar_text',
        icon: <IoIcons.IoMdHome />,
    },
    {
        title: 'Organize',
        path: '/organize',
        className: 'sidebar_text',
        icon: <LuIcons.LuPenSquare />,
    },
    {
        title: 'Events',
        path: '/events',
        className: 'sidebar_text',
        icon: <BsIcons.BsCalendar3Event  />,
    },
]