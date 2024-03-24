import { useEffect, useState } from "react";
import { retrieveAccount, addEvent } from '../custom_components/Functions';
import { useNavigate } from "react-router-dom";

export const Organize = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState(0);
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    useEffect(
        () => {
            const LOGGED_USER = JSON.parse(window.localStorage.getItem('LOGGED_USER'));

            if (LOGGED_USER !== null) {
                setUserId(LOGGED_USER);
                
                const events = JSON.parse(window.localStorage.getItem('events')) || [];
                setEvents(events);
            }

        }, []
    )

    const organizeEvent = () => {
        if (userId >= 1) {
            console.log('Organizing an event...');

            const _events = events;
            const eventId = _events.length;

            const event = {
                eventId: eventId,
                title: title,
                date: date,
                description: description,
                userId: userId,
            }

            _events.push(event);
            window.localStorage.setItem('events', JSON.stringify(_events));
            addEvent(event, userId);
        }
        navigate('/events');
    }

    return (
        <div className="flex h-screen">
            <div className="flex w-full bg-light-brown items-center justify-center">
                
                <div className="organize_input">
                    <h2 className="text-[30px] text-dark-green border-b-[2px] border-dark-green pb-[10px] mb-[10px] w-[75%]">What's on your mind?</h2>
                    
                    <label htmlFor="title">
                        Title
                        <input
                            type="text"
                            id='title'
                            value={title}
                            onChange={(e)=>{setTitle(e.target.value)}}
                        />
                    </label>

                    <label htmlFor="date">
                        Date
                        <input
                            type="date"
                            id='date'
                            value={date}
                            onChange={(e)=>{setDate(e.target.value)}}
                        />
                    </label>

                    <label htmlFor="description">
                        Description
                        <textarea
                            className="h-[200px] text-[18px] p-[5px] bg-transparent border-[1px] border-dark-green hover:bg-lighter-brown focus:outline-none focus:border-[2px] focus:border-dark-green"
                            type="text"
                            id='description'
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                        />
                    </label>

                    <div className="flex w-full justify-end items-center">
                        <button className="text-[20px] border-[1px] border-dark-green pt-[5px] pb-[5px] pl-[10px] pr-[10px] hover:bg-lighter-brown"
                            onClick={()=>organizeEvent()}>
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-darker-dirty-white w-full justify-center items-center text-dark-green">
                <h2 className="text-[40px] font-bold">ORGANIZING AN EVENT</h2>
                <h3 className="text-[25px]">Never made this easy!</h3>
            </div>
        </div>
    )
}