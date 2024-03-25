import { useEffect, useState } from "react";
import { retrieveAccount, ownedEvents } from "../custom_components/Functions";
import { useNavigate } from "react-router-dom";

export const Organize = () => {
    const [eventToggle, setEventToggle] = useState(false);
    const [loggedUser, setLoggedUser] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);
    const [organizer, setOrganizer] = useState(false);
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    useEffect(
        () => {
            const LOGGED_USER = JSON.parse(window.localStorage.getItem('LOGGED_USER')) || null;

            if (LOGGED_USER !== null) {
                const account = retrieveAccount(LOGGED_USER);
                setLoggedUser(account);
                setLoginStatus(true);
                
                if (account.userType >= 1) {
                    const _ownedEvents = ownedEvents(loggedUser.userId);
                    setOrganizer(true);

                    setEvents(_ownedEvents);
                } else {
                    navigate('/events');
                    console.log('Navigating to events page...');
                }
            } else {
                navigate('/login');
                console.log('Navigating to login page...');
            }
        }, [organizer]
    )

    const handleOnClick = (state, eventId) => {
        switch (state) {
            case 'Edit':
                console.log('Editing event...');
                break;
            case 'Delete':
                console.log('Deleting event...');
                break;
            case 'EventToggle':
                console.log('Displaying event ' + eventId + '...');
                setEventToggle(!eventToggle);
            default:
                break;
        }
    }

    return (
        <div className="flex bg-darker-dirty-white h-screen items-center justify-center">
            <div className="flex flex-col h-full w-[90%] mt-[50px]">
                <h2 className="text-[30px] ml-[20px] mb-[20px]">Manage Your Events</h2>
                <ul className="flex flex-col border-2 border-black rounded-[12px]">
                    {events.map(
                        (item, index) => {
                            return(
                                <li key={index} className="flex flex-col pr-[20px] pl-[20px] pt-[10px] pb-[10px] hover:bg-dirty-white hover:rounded-[12px] text-[18px] hover:cursor-pointer"
                                    onClick={()=>handleOnClick('EventToggle', item.eventId)}>
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <span>{item.title}</span>
                                            <span>{item.description}</span>
                                            <span>{item.date}</span>
                                        </div>

                                        <div>
                                            <button className= "bg-light-brown text-[16px] pt-[5px] pb-[5px] pl-[20px] pr-[20px] hover:bg-lighter-brown"
                                                onClick={()=>{handleOnClick('Edit', item.eventId)}}>
                                                Edit
                                            </button>
                                            <button className="bg-lighter-green text-[16px] pt-[5px] pb-[5px] pl-[10px] pr-[10px] hover:bg-dark-green hover:text-white"
                                                onClick={()=>{handleOnClick('Delete', item.eventId)}}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div key={index} className={eventToggle ? 'flex' 
                                            : 'hidden'}>
                                        <span>{item.description}</span>
                                    </div>
                                </li>
                            )
                        }
                    )}
                    
                </ul>

                <div className="flex w-full h-fit justify-end items-center mt-[10px]">
                    <button className="text-[20px] text-dark-green w-fit h-fit rounded-[12px] border-[2px] border-dark-green pt-[5px] pb-[5px] pr-[20px] pl-[20px] hover:bg-light-green hover:text-white hover:border-2 hover:border-light-green"
                        onClick={()=>navigate('create')}>
                        Add Event
                    </button>
                </div>
            </div>
        </div>
    )
}