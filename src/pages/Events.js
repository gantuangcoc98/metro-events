import { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { retrieveAccount, retrieveRequest } from '../custom_components/Functions';

const Events = () => {
    const [organizer, setOrganizer] = useState(false);
    const [requested, setRequested] = useState(false);
    const [loggedUser, setLoggedUser] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    useEffect(
        () => {
            const LOGGED_USER = JSON.parse(window.localStorage.getItem('LOGGED_USER'));
            const _events = JSON.parse(window.localStorage.getItem('events')) || events;

            if (LOGGED_USER !== null) {
                const account = retrieveAccount(LOGGED_USER);
                setLoggedUser(account);
                setLoginStatus(true);

                if (retrieveRequest(LOGGED_USER) !== null) {
                    setRequested(true);
                } else {
                    account.userType >= 1 ? setOrganizer(true) : setOrganizer(false);
                }
            }

            if (_events.length > 0) setEvents(_events);
        }, []
    )

    const requestOrganizer = () => {
        const organizer_requests = JSON.parse(window.localStorage.getItem('organizer_requests')) || [];
        organizer_requests.push(loggedUser);
        window.localStorage.setItem('organizer_requests', JSON.stringify(organizer_requests));
    }

    const handleOnClick = (state) => {
        switch (state) {
            case 'organize_event':
                navigate('/organize');
                console.log('Navigating to organize page...');
                break;
            case 'request_organizer':
                if (!loginStatus) {
                    navigate('/login');
                    console.log('Navigating to login page...');
                } else {
                    requestOrganizer();
                    window.location.reload();
                    console.log('Requested to be an organizer');
                }
                break;
            default:
                break;
        }
    }

    const requestParticipation = (eventId) => {
        console.log("Requesting to participate event " + eventId + "...");
    }

    return (
        <div>
            {organizer ?
                <div className='organizer_section'>
                    <h3 className='text-[25px]'>Start organizing now!</h3>
                    <button className='request_button' onClick={()=>{handleOnClick('organize_event')}}>Organize event</button>
                </div> 
                :
                requested ? 
                    <h3 className='organizer_section'>We are processing your request as organizer, thank you for being patient.</h3>
                    :
                    <div className='organizer_section'>
                        <h3 className='text-[25px] text-dark-green'>Want to organize your own event?</h3>
                        <button className='request_button' onClick={()=>{handleOnClick('request_organizer')}}>Request as organizer</button>
                    </div>
            }

            <div className="flex h-screen overflow-x-scroll bg-dark-green scrollbar-hide">
                <div className='flex w-[250px] items-center justify-center bg-dark-green'>
                    <h1 className='rotate-[-90deg] text-[100px] font-bold text-white'>
                        EVENTS
                    </h1>
                </div>

                <ul className='flex list-none h-full w-fit bg-light-brown'>
                        {events.map((item, index) => {
                            return (
                                <li key={index} className="flex flex-col gap-[20px] w-[500px] items-center border-[1px] border-black">
                                    <div style={{
                                            display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%',
                                            borderBottom: '1px solid black', padding: '20px 0px'
                                        }}
                                    >
                                        <span style={{fontSize: '30px'}}>{item.title}</span>
                                        <span style={{fontSize: '20px'}}>{item.date}</span>
                                    </div>
                                    <div className='flex flex-col w-[75%] h-full text-[16px] justify-between mb-[40px]'>
                                        {item.description}

                                        <span className='flex w-full h-fit justify-end'>
                                            <button className='text-[20px]'
                                                onClick={()=>{requestParticipation(item.eventId)}}>
                                                Participate
                                            </button>
                                        </span>
                                    </div>
                                    
                                </li>
                            )
                        })}
                </ul>
            </div>
        </div>
    )
};

export default Events;