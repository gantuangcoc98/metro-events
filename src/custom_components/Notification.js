import { useEffect, useState } from 'react';
import '../App.css';
import { retrieveAccount } from './Functions';
import { useNavigate } from 'react-router-dom';

export const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loggedUser, setLoggedUser] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);

    const navigate = useNavigate();

    useEffect(
        () => {
            const LOGGED_USER = JSON.parse(window.localStorage.getItem('LOGGED_USER'));

            if (LOGGED_USER !== null) {
                const account = retrieveAccount(LOGGED_USER);
                setLoggedUser(account);
                setLoginStatus(true);

                const _notifications = JSON.parse(window.localStorage.getItem('notifications'));
                const userNotif = _notifications.find(notif => notif.userId === account.userId);

                const sortedNotifications = userNotif.items.sort((a, b) => b.itemId - a.itemId);
                setNotifications(sortedNotifications.slice(0,10));
            }
        }, [loginStatus]
    )

    return (
        <div className="notification">
            <ul className="flex flex-col h-full w-[300px] overflow-y-auto gap-2 notifications">
                {notifications.map(
                    (item, index) => {
                        return (
                            <li key={index} className='flex flex-col text-dark-green w-full p-[10px] border-b-2 border-dark-green hover:cursor-pointer hover:bg-darker-dirty-white'
                                onClick={()=>{
                                        navigate(item.path);
                                        window.location.reload();
                                    }}>
                                <div className="flex items-center gap-2">
                                    <span className="text-[30px]">{item.icon}</span>
                                    <div className="flex flex-col gap-[10px]">
                                        <span>{item.title}</span>
                                        <span className="text-[12px]">{item.description}</span>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                )}
            </ul>
        </div>
    )
}