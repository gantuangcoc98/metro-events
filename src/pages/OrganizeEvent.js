import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { retrieveAccount, updateEvents } from "../custom_components/Functions";

export const OrganizeEvent = () => {
    let { eventId } = useParams();
    const [event, setEvent] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);
    const [loggedUser, setLoggedUser] = useState({});

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const [participants, setParticipants] = useState([]);

    const navigate = useNavigate();

    useEffect(
        () => {
            const LOGGED_USER = JSON.parse(window.localStorage.getItem('LOGGED_USER'));

            if (LOGGED_USER !== null) {
                const account = retrieveAccount(LOGGED_USER);
                setLoginStatus(true);
                setLoggedUser(account);

                eventId = JSON.parse(eventId);

                const userEvents = account.events;
                if (userEvents && userEvents.length > 0) {
                    const foundEvent = userEvents.find(event => event.eventId === eventId);
                    if (foundEvent) {
                        setParticipants(foundEvent.participants);
                        setEvent(foundEvent);
                        fetchEvent();
                    } else {
                        console.log('Event not found!');
                        navigate('/organize');
                        console.log('Navigating to organize page...');
                    }
                } else {
                    console.log('You have no events...');
                    navigate('/organize');
                    console.log('Navigating to organize page...');
                }
            } else {
                navigate('/login');
            }
        }, [loginStatus]
    )

    const fetchEvent = () => {
        setTitle(event.title);
        setDate(event.date);
        setDescription(event.description);
    }

    const deleteEvent = () => {
        loggedUser.events = loggedUser.events.filter(_event => _event.eventId !== event.eventId);

        const accounts = JSON.parse(window.localStorage.getItem('accounts'));
        const userFound = accounts.findIndex(account => account.userId === loggedUser.userId);
        if (userFound >= 0) {
            accounts[userFound] = loggedUser;
            window.localStorage.setItem('accounts', JSON.stringify(accounts));
            updateEvents();

            if (participants && Array.isArray(participants)) {
                participants.forEach(participant => {
                    const _participant = retrieveAccount(participant.userId);
    
                    _participant.participates = _participant.participates.filter(request => request.eventId !== event.eventId);
    
                    const accounts = JSON.parse(window.localStorage.getItem('accounts'));
                    const accountFound = accounts.findIndex(account => account.userId ===  _participant.userId);
                    if (accountFound) {
                        accounts[accountFound] = _participant;
                        window.localStorage.setItem('accounts', JSON.stringify(accounts));
                    } else {
                        console.log('Account not found.');
                    }
                })
            } else {
                console.log('Error fetching participants.');
            }

            navigate('/organize');
            window.location.reload();
            console.log('Successfully deleted event ', event.title);
        } else {
            navigate('/login');
        }
    }

    const saveEvent = () => {
        event.title = title;
        event.date = date;
        event.description = description;

        const eventFound = loggedUser.events.findIndex(_event => _event.eventId === event.eventId);
        if (eventFound >= 0) {
            loggedUser.events[eventFound] = event;
            
            const accounts = JSON.parse(window.localStorage.getItem('accounts'));
            const accountFound = accounts.findIndex(account => account.userId === loggedUser.userId);
            if (accountFound >= 0) {
                accounts[accountFound] = loggedUser;
                window.localStorage.setItem('accounts', JSON.stringify(accounts));
                updateEvents();

                console.log('Successfully saved event.');
                window.location.reload();
            } else {
                console.log('Account not found.');
                navigate('/login');
            }
            
        } else {
            console.log('Event not found. Try reloading the page.');
        }
    }

    const decisionForParticipant = (participantId, decision) => {
        const participant = retrieveAccount(participantId);

        const requestFound = event.participants.findIndex(request => request.userId === participantId);
        if (requestFound >= 0) {
            event.participants[requestFound].status = decision;

            const eventFound = loggedUser.events.findIndex(_event => _event.eventId === event.eventId);
            if (eventFound >= 0) {
                loggedUser.events[eventFound] = event;

                const accounts = JSON.parse(window.localStorage.getItem('accounts'));
                const accountFound = accounts.findIndex(account => account.userId === loggedUser.userId);
                const participantFound = accounts.findIndex(account => account.userId === participant.userId);
                if (accountFound >= 0 && participantFound >= 0) {
                    const _requestFound = participant.participates.findIndex(request => request.eventId === event.eventId);
                    if (_requestFound >= 0) {
                        participant.participates[_requestFound].status = decision;

                        accounts[accountFound] = loggedUser;
                        accounts[participantFound] = participant;
                        window.localStorage.setItem('accounts', JSON.stringify(accounts));
                        updateEvents();

                        window.location.reload();
                    } else {
                        console.log('Request for the participant not found.');
                    }
                } else {
                    console.log('Account or participant not found. Try logging in again.');
                    navigate('/login');
                }
            } else {
                console.log('Event not found. Try reloading the page.');
            }
        }
    }

    const userParticipant = (userId) => {
        const user = retrieveAccount(userId);
        return user;
    }

    const status = (userId) => {
        const participant = participants.find(user => user.userId === userId);
        return participant.status;
    }

    return (
        <div className="flex h-screen">
            <div className="division bg-darker-dirty-white">
                <div className="flex flex-col w-[80%] h-full justify-center items-start">
                    <label htmlFor="title">
                        <input 
                            className="text-[30px] bg-transparent p-[5px] focus:outline-dark-green rounded-[12px]"
                            id='title'
                            type="text"
                            value={title}
                            onChange={(e) => {setTitle(e.target.value)}}
                        />
                    </label>
                    
                    <div className="flex flex-col h-fit w-full border-[2px] border-dark-green rounded-[12px] mt-[20px] justify-center items-start p-[10px]">
                        <label className="flex w-full items-center justify-end"
                            htmlFor="date">
                            <input
                                className="text-[20px] bg-transparent focus:outline-none"
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => {setDate(e.target.value)}}
                            />
                        </label>

                        <label className="w-full h-fit"
                            htmlFor="description">
                            <textarea
                                className="text-[20px] bg-transparent w-full h-[500px] focus:outline-none"
                                id="description"
                                type="text"
                                value={description}
                                onChange={(e) => {setDescription(e.target.value)}}
                            />
                        </label>
                    </div>
                    
                    <div className="flex gap-[20px] w-full h-fit justify-between items-center text-[20px] p-[10px]">
                        <button onClick={()=>deleteEvent()}>Delete</button>
                        <button onClick={()=>saveEvent()}>Save</button>
                    </div>
                </div>
            </div>

            <div className="division bg-dark-green">
                <div className="flex flex-col w-[80%] h-full justify-center items-end text-white">
                    <h2 className="text-[30px]">Participants</h2>

                    <ul className="flex flex-col mt-[20px] w-full h-[500px] border-[2px] border-white p-[10px] rounded-[12px]">
                        {participants.map(
                            (item, index) => {
                                return (
                                    <li className="flex w-full h-fit justify-between items-center text-[20px]"
                                        key={index}>
                                        <span>{userParticipant(item.userId).lastname}, {userParticipant(item.userId).firstname}</span>

                                        {status(item.userId) === 1 && <span>Accepted</span>}
                                        {status(item.userId) === -1 && <span>Denied</span>}
                                        {status(item.userId) === 0 && 
                                        <div className="flex h-fit w-fit gap-[20px]">
                                            <button onClick={()=>decisionForParticipant(item.userId, 1)}>Accept</button>
                                            <button onClick={()=>decisionForParticipant(item.userId, -1)}>Deny</button>
                                        </div>
                                        }
                                        
                                    </li>
                                )
                            }
                        )}
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}