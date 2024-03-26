import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { notifyTo, retrieveAccount, updateEvents } from "../custom_components/Functions";
import * as MdIcons from "react-icons/md";


export const OrganizeEvent = () => {
    let { eventId } = useParams();
    const [event, setEvent] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);
    const [loggedUser, setLoggedUser] = useState({});

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const [participants, setParticipants] = useState([]);

    const [deleteToggle, setDeleteToggle] = useState(false);
    const [deleteReason, setDeleteReason] = useState('');

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
                });

                const eventTitle = event.title;
                const acceptedParticipants = participants.filter(participant => participant.status === 1);
                acceptedParticipants.forEach(participant => {
                    notifyTo(participant.userId, 'deleteEvent', eventTitle, deleteReason);
                });

            } else {
                console.log('Error fetching participants.');
            }

            window.location.reload();
            navigate('/organize');
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
                        decision === 1 ? notifyTo(participantId, 'acceptParticipation', event.eventId) : notifyTo(participantId, 'denyParticipation', event.eventId);

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
        <>
            {deleteToggle &&
                <div className="absolute w-screen h-screen bg-dark-green bg-opacity-85">
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="flex flex-col gap-[20px] w-[80%] h-full justify-center items-center">
                            <h1 className="w-full h-fit text-[30px] text-white ml-[20px]">Are you sure you want to delete this event?</h1>

                            <label htmlFor="deleteReason" className="w-full h-fit">
                                <textarea className="h-[500px] w-full p-[10px] text-[20px] bg-darker-dirty-white focus:outline-none rounded-[12px]"
                                    id="deleteReason"
                                    type="text"
                                    placeholder="Type your reason here..."
                                    value={deleteReason}
                                    onChange={(e) => {setDeleteReason(e.target.value)}}/>
                            </label>

                            <div className="flex w-full h-fit text-[20px] text-white justify-end items-center gap-[30px] mr-[20px]">
                                <button className="hover:text-red-500"
                                    onClick={() => deleteEvent()}>Confirm</button>
                                <button className="border-2 border-white pt-[5px] pb-[5px] pl-[20px] pr-[20px] hover:bg-darker-dirty-white hover:border-[2px] hover:border-darker-dirty-white hover:text-dark-green"
                                    onClick={() => setDeleteToggle(!deleteToggle)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

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
                            <MdIcons.MdDeleteForever className="hover:text-red-500 text-[30px] hover:cursor-pointer" onClick={()=>setDeleteToggle(!deleteToggle)}/>
                            <button className="border-2 border-dark-green hover:border-2 hover:border-dark-green hover:bg-dark-green hover:text-white pt-[2px] pb-[2px] pl-[30px] pr-[30px] rounded-[12px]"
                                onClick={()=>saveEvent()}>Save</button>
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
        </>
    )
}