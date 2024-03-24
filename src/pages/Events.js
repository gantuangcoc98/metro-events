import '../App.css';
import { EventsData } from '../custom_components/EventsData';

const Events = () => {
    const handleOnClick = (itemId) => {
        console.log("Navigating to event", itemId);
    }

    return (
        <div className="flex h-screen overflow-x-scroll">
            <div className='flex w-[250px] items-center justify-center bg-dark-green'>
                <h1 className='rotate-[-90deg] text-[100px] font-bold text-white'>
                    EVENTS
                </h1>
            </div>

            <ul className='flex list-none h-full w-fit bg-light-brown'>
                    {EventsData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
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
                                            onClick={()=>{handleOnClick(item)}}>
                                            Participate
                                        </button>
                                    </span>
                                </div>
                                
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
};

export default Events;