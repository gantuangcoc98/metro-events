import { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { notifyTo, retrieveAccount, retrieveEvent, retrieveRequest, updateEvents } from '../custom_components/Functions';

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

        const accounts = JSON.parse(window.localStorage.getItem('accounts'));
        const adminAccounts = accounts.filter(account => account.userType === 2);
        if (adminAccounts && Array.isArray(adminAccounts)) {
            adminAccounts.forEach(account => {
                notifyTo(account.userId, 'requestOrganizer');
            })
        }

        console.log('Requested to be an organizer');
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
                }
                break;
            default:
                break;
        }
    }

    const requestParticipation = (eventId) => {
        const event = retrieveEvent(eventId);
        const request = {
            requestId: event.participants.length + 1,
            eventId: eventId,
            userId: loggedUser.userId,
            status: 0,
        }
        event.participants.push(request);

        loggedUser.participates.push(request);

        const owner = retrieveAccount(event.userId);
        const eventFound = owner.events.findIndex(_event => _event.eventId === eventId);
        if (eventFound >= 0) {
            owner.events[eventFound] = event;

            const accounts = JSON.parse(window.localStorage.getItem('accounts'));
            if (accounts && Array.isArray(accounts)) {
                const ownerFound = accounts.findIndex(account => account.userId === owner.userId);
                const userFound = accounts.findIndex(account => account.userId === loggedUser.userId);
                if (ownerFound >= 0 && userFound >= 0) {
                    accounts[ownerFound] = owner;
                    accounts[userFound] = loggedUser;
                    window.localStorage.setItem('accounts', JSON.stringify(accounts));
                    updateEvents();
                    notifyTo(owner.userId, 'requestParticipation', event.eventId)

                    console.log('Requested to participate event ', event.title);
                    window.location.reload();
                } else {
                    console.log('Owner not found. Try reloading the page.');
                }
            } else {
                console.log('Error fetching accounts.');
            }
        } else {
            console.log('Event not found. Try reloading the page.');
        }

    }

    const checkEventRequest = (eventId) => {
        const event = retrieveEvent(eventId);
        const participants = event.participants;

        const userFound = participants.find(user => user.userId === loggedUser.userId);
        if (userFound) return true;

        return false;
    }

    const eventOwner = (eventId) => {
        const event = retrieveEvent(eventId);
        if (event.userId === loggedUser.userId) {
            return true;
        }

        return false;
    }

    const editEvent = (eventId) => {
        console.log('Editing event: ' + eventId + '...');

        navigate(`/organize/event/${eventId}`);
    }

    const status = (eventId) => {
        const event = retrieveEvent(eventId);
        const user = event.participants.find(user => user.userId === loggedUser.userId);
        return user.status;
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

            <div className="flex h-screen overflow-x-auto bg-dark-green events">
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
                                            {checkEventRequest(item.eventId) ? 
                                                <>
                                                    {status(item.eventId) === 0 && <span className='text-[20px]'>Requested to participate...</span>}
                                                    {status(item.eventId) === 1 && <span className='text-[20px]'>Accepted</span>}
                                                    {status(item.eventId) === -1 && <span className='text-[20px]'>Denied</span>}
                                                </>
                                                :
                                                <>
                                                    {eventOwner(item.eventId) ?
                                                        <button className='text-[20px]'
                                                            onClick={()=>editEvent(item.eventId)}>
                                                            Edit
                                                        </button>
                                                        :
                                                        <button className='text-[20px]'
                                                        onClick={()=>{
                                                            if (loginStatus) {
                                                                requestParticipation(item.eventId);
                                                            } else {
                                                                navigate('/login');
                                                            }
                                                            }}>
                                                        Participate
                                                        </button>
                                                    }
                                                </>
                                            }
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