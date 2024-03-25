import { useState } from 'react';
import '../App.css';

const EventOrganizer = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSaveEvent = () => {
        console.log('Saving event...');
        
        console.log({ title, description, date });
    }

    return (
        <div className="event-organizer">
            <h2>Organize Your Event</h2>
            <div className="form-group">
                <label htmlFor="title">Event Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter event title"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Event Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter event description"
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="date">Event Date:</label>
                <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <button onClick={handleSaveEvent}>Save Event</button>
        </div>
    );
};

export default EventOrganizer;
