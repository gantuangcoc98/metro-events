import * as IoIcons from 'react-icons/io';
import* as MdIcons from "react-icons/md";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        className: 'sidebar_text',
        icon: <IoIcons.IoMdHome />,
    },
    {
        title: 'Login',
        path: '/login',
        className: 'sidebar_text',
        icon: <MdIcons.MdLogin />,
    }
]