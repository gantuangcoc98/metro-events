import * as IoIcons from 'react-icons/io';
import* as MdIcons from "react-icons/md";

export const SidebarData = [
    {
        id: 1,
        title: 'Home',
        path: '/',
        className: 'sidebar_text',
        icon: <IoIcons.IoMdHome />,
    },
    {
        id: 2,
        title: 'Login',
        path: '/login',
        className: 'sidebar_text',
        icon: <MdIcons.MdLogin />,
    }
]